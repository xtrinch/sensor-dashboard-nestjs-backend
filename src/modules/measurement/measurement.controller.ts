import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards
} from '@nestjs/common';
import { Ctx, MessagePattern } from '@nestjs/microservices';
import { MeasurementService } from '~/modules/measurement/measurement.service';
import { DisplayGuard } from '~modules/display/display.guard';
import { DisplayRequest } from '~modules/display/display.interfaces';
import { MeasurementCreateDto } from '~modules/measurement/dto/measurement.create.dto';
import { MeasurementDisplayDto } from '~modules/measurement/dto/measurement.display.dto';
import { MeasurementDto } from '~modules/measurement/dto/measurement.dto';
import { MeasurementListCreateDto } from '~modules/measurement/dto/measurement.list.create.dto';
import { MeasurementQueryDto } from '~modules/measurement/dto/measurement.query.dto';
import { MeasurementTypeEnum } from '~modules/measurement/enum/measurement-type.enum';
import {
  DisplayMeasurementAggregateDto,
  MeasurementAggregateDto
} from '~modules/measurement/measurement.interfaces';
import { SensorGuard, SensorRequest } from '~modules/sensor/sensor.guard';
import {
  SensorMqttContext,
  SensorMqttGuard
} from '~modules/sensor/sensor.mqtt.guard';

@Controller('measurements')
export class MeasurementController {
  constructor(private readonly measurementService: MeasurementService) {}

  @Get()
  public async findAll(
    @Query() query: MeasurementQueryDto,
  ): Promise<MeasurementAggregateDto> {
    const items = await this.measurementService.findAll(query);

    Object.keys(items).map((measurementTypeKey: MeasurementTypeEnum) =>
      items[measurementTypeKey].map(MeasurementDto.fromMeasurement),
    );

    return (items as unknown) as MeasurementAggregateDto;
  }

  @UseGuards(SensorGuard)
  @Post()
  public async create(
    @Body() data: MeasurementCreateDto,
    @Request() request: SensorRequest,
  ): Promise<MeasurementDto> {
    const measurement = await this.measurementService.create(request, data);
    return MeasurementDto.fromMeasurement(measurement);
  }

  @UseGuards(SensorGuard)
  @Post('/multi')
  public async createMultiple(
    @Body() data: MeasurementListCreateDto,
    @Request() request: SensorRequest,
  ): Promise<MeasurementDto[]> {
    const measurementList = await this.measurementService.createMultiple(
      request.sensor,
      data,
      request.forwarder,
    );
    return measurementList.map(MeasurementDto.fromMeasurement);
  }

  @MessagePattern('measurements/multi/#')
  @UseGuards(SensorMqttGuard)
  public async getTemperature(@Ctx() context: SensorMqttContext) {
    const data: MeasurementListCreateDto = context.payload;
    await this.measurementService.createMultiple(
      context.sensor,
      data,
    );
  }

  @UseGuards(DisplayGuard)
  @Get('display')
  public async getLatestMeasurements(
    @Request() request: DisplayRequest,
  ): Promise<DisplayMeasurementAggregateDto> {
    const items = await this.measurementService.getLatestMeasurements(request);

    const response: DisplayMeasurementAggregateDto = {};
    Object.assign(response, items);

    // map the measurements to a DTO
    Object.keys(items).map((sensorIdKey) => {
      const measurementTypes = items[sensorIdKey].measurements;

      Object.keys(measurementTypes).map((measurementTypeKey) => {
        response[sensorIdKey].measurements[
          measurementTypeKey
        ] = MeasurementDisplayDto.fromMeasurement(
          measurementTypes[measurementTypeKey],
        );
      });
    });

    return response;
  }
}
