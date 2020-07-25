import { Controller, Get, Query, Post, Body, UseGuards } from '@nestjs/common';
import { MeasurementService } from '~/modules/measurement/measurement.service';
import { MeasurementDto } from '~modules/measurement/dto/measurement.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { PaginationQueryDto } from '~modules/utils/pagination.query.dto';
import { PaginationDto } from '~modules/utils/pagination.dto';
import Measurement from '~modules/measurement/measurement.entity';
import { MeasurementCreateDto } from '~modules/measurement/dto/measurement.create.dto';
import { SensorGuard } from '~modules/sensor/sensor.guard';

@Controller('measurements')
export class MeasurementController {
  constructor(private readonly measurementService: MeasurementService) {}

  @Get()
  public async findAll(
    @Query() pagination: PaginationQueryDto,
  ): Promise<Pagination<MeasurementDto>> {
    const items = await this.measurementService.findAll(pagination);

    return PaginationDto.fromPagination<Measurement, MeasurementDto>(
      items,
      MeasurementDto.fromMeasurement,
    );
  }

  @UseGuards(SensorGuard)
  @Post()
  public async create(
    @Body() data: MeasurementCreateDto,
  ): Promise<MeasurementDto> {
    const measurement = await this.measurementService.create(data);
    return MeasurementDto.fromMeasurement(measurement);
  }
}
