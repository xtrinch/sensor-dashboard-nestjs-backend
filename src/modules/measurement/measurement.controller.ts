import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { MeasurementService } from '~/modules/measurement/measurement.service';
import { MeasurementDto } from '~modules/measurement/dto/measurement.dto';
import { PaginationDto } from '~utils/pagination.dto';
import Measurement from '~modules/measurement/measurement.entity';
import { MeasurementCreateDto } from '~modules/measurement/dto/measurement.create.dto';
import { SensorGuard, SensorRequest } from '~modules/sensor/sensor.guard';
import { MeasurementQueryDto } from '~modules/measurement/dto/measurement.query.dto';

@Controller('measurements')
export class MeasurementController {
  constructor(private readonly measurementService: MeasurementService) {}

  @Get()
  public async findAll(
    @Query() query: MeasurementQueryDto,
  ): Promise<PaginationDto<MeasurementDto>> {
    const items = await this.measurementService.findAll(query);

    return PaginationDto.fromPagination<Measurement, MeasurementDto>(
      items,
      MeasurementDto.fromMeasurement,
    );
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
    @Body() data: MeasurementCreateDto[],
    @Request() request: SensorRequest,
  ): Promise<MeasurementDto[]> {
    const measurementList = await this.measurementService.createMultiple(
      request,
      data,
    );
    return measurementList.map(MeasurementDto.fromMeasurement);
  }
}
