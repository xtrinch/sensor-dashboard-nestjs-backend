import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Forwarder, ForwarderId } from '~/modules/forwarder/forwarder.entity';
import { ForwarderService } from '~/modules/forwarder/forwarder.service';
import { ForwarderCreateDto } from '~modules/forwarder/dto/forwarder.create.dto';
import { ForwarderDetailsDto } from '~modules/forwarder/dto/forwarder.details.dto';
import { ForwarderDto } from '~modules/forwarder/dto/forwarder.dto';
import { ForwarderUpdateDto } from '~modules/forwarder/dto/forwarder.update.dto';
import { ForwarderGuard } from '~modules/forwarder/forwarder.guard';
import { ForwarderRequest } from '~modules/forwarder/forwarder.interfaces';
import AuthGuard from '~modules/user/auth.decorator';
import { UserRequest } from '~modules/user/jwt.guard';
import { PaginationDto } from '~utils/pagination.dto';
import { PaginationQueryDto } from '~utils/pagination.query.dto';

@Controller('forwarders')
export class ForwarderController {
  constructor(private readonly forwarderService: ForwarderService) {}

  @Get()
  public async findAll(
    @Query() pagination: PaginationQueryDto,
  ): Promise<PaginationDto<ForwarderDto>> {
    const items = await this.forwarderService.findAll({}, {}, pagination);

    return PaginationDto.fromPagination<Forwarder, ForwarderDto>(
      items,
      ForwarderDto.fromForwarder,
    );
  }

  @AuthGuard()
  @Get('/my')
  public async findMyForwarders(
    @Query() pagination: PaginationQueryDto,
    @Request() request: UserRequest,
  ): Promise<PaginationDto<ForwarderDetailsDto>> {
    const items = await this.forwarderService.findAll(
      {
        userId: request.user?.id,
      },
      { relations: [] },
      pagination,
    );

    return PaginationDto.fromPagination<Forwarder, ForwarderDetailsDto>(
      items,
      ForwarderDetailsDto.fromForwarder,
    );
  }

  @AuthGuard()
  @Post()
  public async create(
    @Body() data: ForwarderCreateDto,
    @Request() request: UserRequest,
  ): Promise<ForwarderDetailsDto> {
    const forwarder = await this.forwarderService.create(request, data);
    return ForwarderDetailsDto.fromForwarder(forwarder);
  }

  @AuthGuard()
  @Put('/:id')
  public async update(
    @Body() data: ForwarderUpdateDto,
    @Param('id') id: ForwarderId,
    @Request() request: UserRequest,
  ): Promise<ForwarderDetailsDto> {
    const forwarder = await this.forwarderService.update(request, id, data);
    return ForwarderDetailsDto.fromForwarder(forwarder);
  }

  @AuthGuard()
  @Get('/:id')
  public async get(
    @Param('id') id: ForwarderId,
    @Request() request: UserRequest,
  ): Promise<ForwarderDetailsDto> {
    const forwarder = await this.forwarderService.userFind(
      request,
      { id },
      { relations: [] },
    );

    return ForwarderDetailsDto.fromForwarder(forwarder);
  }

  @AuthGuard()
  @Delete('/:id')
  public async delete(
    @Param('id') id: ForwarderId,
    @Request() request: UserRequest,
  ): Promise<{ status: string }> {
    await this.forwarderService.delete(request, { id });

    return {
      status: '200',
    };
  }

  @UseGuards(ForwarderGuard)
  @Post('ping')
  public async ping(
    @Request() request: ForwarderRequest,
  ): Promise<{ status: number }> {
    await this.forwarderService.registerPing(request);

    return {
      status: 200,
    };
  }
}
