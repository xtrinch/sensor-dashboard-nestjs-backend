import {
  Body,
  Controller,







  Delete, Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards
} from '@nestjs/common';
import { Sensor, SensorId } from '~/modules/sensor/sensor.entity';
import { SensorService } from '~/modules/sensor/sensor.service';
import { SensorCreateDto } from '~modules/sensor/dto/sensor.create.dto';
import { SensorDetailsDto } from '~modules/sensor/dto/sensor.details.dto';
import { SensorDto } from '~modules/sensor/dto/sensor.dto';
import { SensorUpdateDto } from '~modules/sensor/dto/sensor.update.dto';
import { JwtGuard, UserRequest } from '~modules/user/jwt.guard';
import { PaginationDto } from '~utils/pagination.dto';
import { PaginationQueryDto } from '~utils/pagination.query.dto';

@Controller('sensors')
export class SensorController {
  constructor(private readonly sensorService: SensorService) {}

  @Get()
  public async findAll(
    @Query() pagination: PaginationQueryDto,
  ): Promise<PaginationDto<SensorDto>> {
    const items = await this.sensorService.findAll({}, pagination);

    return PaginationDto.fromPagination<Sensor, SensorDto>(
      items,
      SensorDto.fromSensor,
    );
  }

  @UseGuards(JwtGuard)
  @Get('/my')
  public async findMySensors(
    @Query() pagination: PaginationQueryDto,
    @Request() request: UserRequest,
  ): Promise<PaginationDto<SensorDetailsDto>> {
    const items = await this.sensorService.findAll(
      {
        userId: request.user?.id,
      },
      pagination,
    );

    return PaginationDto.fromPagination<Sensor, SensorDetailsDto>(
      items,
      SensorDetailsDto.fromSensor,
    );
  }

  @UseGuards(JwtGuard)
  @Post()
  public async create(
    @Body() data: SensorCreateDto,
    @Request() request: UserRequest,
  ): Promise<SensorDetailsDto> {
    const sensor = await this.sensorService.create(request, data);
    return SensorDetailsDto.fromSensor(sensor);
  }

  @UseGuards(JwtGuard)
  @Put('/:id')
  public async update(
    @Body() data: SensorUpdateDto,
    @Param('id') id: SensorId,
    @Request() request: UserRequest,
  ): Promise<SensorDetailsDto> {
    const sensor = await this.sensorService.update(request, id, data);
    return SensorDetailsDto.fromSensor(sensor);
  }

  @UseGuards(JwtGuard)
  @Get('/:id')
  public async get(
    @Param('id') id: SensorId,
    @Request() request: UserRequest,
  ): Promise<SensorDetailsDto> {
    const sensor = await this.sensorService.userFind(request, { id });

    return SensorDetailsDto.fromSensor(sensor);
  }

  @UseGuards(JwtGuard)
  @Delete('/:id')
  public async delete(
    @Param('id') id: SensorId,
    @Request() request: UserRequest,
  ): Promise<{ status: string }> {
    await this.sensorService.delete(
      request,
      { id },
    );

    return {
      status:'200'
    };
  }
}
