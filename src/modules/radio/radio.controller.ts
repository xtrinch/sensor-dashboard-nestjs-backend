import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards
} from '@nestjs/common';
import { Ctx, MessagePattern } from '@nestjs/microservices';
import { isJSON } from 'class-validator';
import { Radio, RadioId } from '~/modules/radio/radio.entity';
import { RadioService } from '~/modules/radio/radio.service';
import { RadioCreateDto } from '~modules/radio/dto/radio.create.dto';
import { RadioDetailsDto } from '~modules/radio/dto/radio.details.dto';
import { RadioDto } from '~modules/radio/dto/radio.dto';
import { RadioUpdateDto } from '~modules/radio/dto/radio.update.dto';
import { RadioMqttContext, RadioMqttGuard } from '~modules/radio/radio.mqtt.guard';
import AuthGuard from '~modules/user/auth.decorator';
import { UserRequest } from '~modules/user/jwt.guard';
import { PaginationDto } from '~utils/pagination.dto';
import { PaginationQueryDto } from '~utils/pagination.query.dto';

@Controller('radios')
export class RadioController {
  constructor(private readonly radioService: RadioService) {}

  @Get()
  public async findAll(
    @Query() pagination: PaginationQueryDto,
  ): Promise<PaginationDto<RadioDto>> {
    const items = await this.radioService.findAll({}, {}, pagination);

    return PaginationDto.fromPagination<Radio, RadioDto>(
      items,
      RadioDto.fromRadio,
    );
  }

  @AuthGuard()
  @Get('/my')
  public async findMyRadios(
    @Query() pagination: PaginationQueryDto,
    @Request() request: UserRequest,
  ): Promise<PaginationDto<RadioDetailsDto>> {
    const items = await this.radioService.findAll(
      {
        userId: request.user?.id,
      },
      { relations: [] },
      pagination,
    );

    return PaginationDto.fromPagination<Radio, RadioDetailsDto>(
      items,
      RadioDetailsDto.fromRadio,
    );
  }

  @AuthGuard()
  @Post()
  public async create(
    @Body() data: RadioCreateDto,
    @Request() request: UserRequest,
  ): Promise<RadioDetailsDto> {
    const radio = await this.radioService.create(request, data);
    return RadioDetailsDto.fromRadio(radio);
  }

  @AuthGuard()
  @Put('/:id')
  public async update(
    @Body() data: RadioUpdateDto,
    @Param('id') id: RadioId,
    @Request() request: UserRequest,
  ): Promise<RadioDetailsDto> {
    const radio = await this.radioService.update(request, id, data);
    return RadioDetailsDto.fromRadio(radio);
  }

  @AuthGuard()
  @Get('/:id')
  public async get(
    @Param('id') id: RadioId,
    @Request() request: UserRequest,
  ): Promise<RadioDetailsDto> {
    const radio = await this.radioService.userFind(
      request,
      { id },
      { relations: [] },
    );

    return RadioDetailsDto.fromRadio(radio);
  }

  @AuthGuard()
  @Delete('/:id')
  @HttpCode(200)
  public async delete(
    @Param('id') id: RadioId,
    @Request() request: UserRequest,
  ): Promise<void> {
    await this.radioService.delete(request, { id });
  }

  // accept pings from radio
  @MessagePattern('radios/ping/#')
  @UseGuards(RadioMqttGuard)
  public async ping(
    @Ctx() context: RadioMqttContext,
  ): Promise<void> {  
    context.radio.lastSeenAt = new Date();
    await Radio.save(context.radio);
  }

  // send config to radio
  @AuthGuard()
  @Post('/:id/send-config')
  @HttpCode(200)
  public async sendConfig(
    @Param('id') id: RadioId,
  ): Promise<void> {
    await this.radioService.sendConfigToRadio(id);
  }

  // request config from radio
  @AuthGuard()
  @Post('/:id/request-config')
  @HttpCode(200)
  public async requestConfig(
    @Param('id') id: RadioId,
  ): Promise<void> {
    await this.radioService.requestConfigFromRadio(id);
  }

  // accept config from radio
  @MessagePattern('radios/#/config-upstream')
  @UseGuards(RadioMqttGuard)
  public async configureRadio(
    @Ctx() context: RadioMqttContext,
  ): Promise<void> {
    const data: string = context.payload;

    // check if valid json
    if (!isJSON(data)) {
      throw new BadRequestException();
    }
    
    context.radio.config = data;
    await Radio.save(context.radio);
  }
}
