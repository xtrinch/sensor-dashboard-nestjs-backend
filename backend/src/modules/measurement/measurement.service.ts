import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Display } from '~modules/display/display.entity';
import { DisplayRequest } from '~modules/display/display.interfaces';
import { Forwarder } from '~modules/forwarder/forwarder.entity';
import { MeasurementCreateDto } from '~modules/measurement/dto/measurement.create.dto';
import { MeasurementListCreateDto } from '~modules/measurement/dto/measurement.list.create.dto';
import { MeasurementQueryDto } from '~modules/measurement/dto/measurement.query.dto';
import {
  DisplayMeasurementAggregateInterface,
  MeasurementAggregateInterface,
} from '~modules/measurement/measurement.interfaces';
import { MeasurementRepository } from '~modules/measurement/measurement.repository';
import { Sensor } from '~modules/sensor/sensor.entity';
import { SensorRequest } from '~modules/sensor/sensor.guard';
import { DateRange } from '~utils/date.range';
import { Measurement } from './measurement.entity';

@Injectable()
export class MeasurementService {
  constructor(
    @InjectRepository(MeasurementRepository)
    private measurementRepository: MeasurementRepository,
  ) {}

  public async findAll(
    query: MeasurementQueryDto,
  ): Promise<MeasurementAggregateInterface> {
    const range = DateRange.parse(query.createdAtRange);
    const results = await this.measurementRepository.groupBy({
      ...range,
      measurementTypes: query.measurementTypes,
      sensorIds: query.sensorIds,
    });

    return results;
  }

  public async getLatestMeasurements(
    request: DisplayRequest,
  ): Promise<DisplayMeasurementAggregateInterface> {
    request.display.lastSeenAt = new Date();
    await Display.save(request.display);

    const results = await this.measurementRepository.getLatest({
      measurementTypes: request.display.measurementTypes || [],
      sensorIds: (request.display.sensors || []).map((s) => s.id),
    });

    return results;
  }

  public async create(
    request: SensorRequest,
    data: MeasurementCreateDto,
  ): Promise<Measurement> {
    const measurement = new Measurement();
    measurement.measurement = data.measurement;
    measurement.measurementType = data.measurementType;
    measurement.sensor = request.sensor;
    measurement.sensorId = request.sensor.id;

    request.sensor.lastSeenAt = new Date();

    if (request.forwarder) {
      request.forwarder.lastSeenAt = new Date();
      request.forwarder.numForwarded += 1;
      await Forwarder.save(request.forwarder);
    }

    await Measurement.save(measurement);
    await Sensor.save(request.sensor);

    return measurement;
  }

  public async createMultiple(
    request: SensorRequest,
    data: MeasurementListCreateDto,
  ): Promise<Measurement[]> {
    const measurements: Measurement[] = [];

    for (const measurementData of data.measurements) {
      const measurement = new Measurement();
      measurement.measurement = measurementData.measurement;
      measurement.measurementType = measurementData.measurementType;
      measurement.sensor = request.sensor;
      measurements.push(measurement);
    }

    request.sensor.lastSeenAt = new Date();

    if (request.forwarder) {
      request.forwarder.lastSeenAt = new Date();
      request.forwarder.numForwarded += 1;
      await Forwarder.save(request.forwarder);
    }

    await Measurement.save(measurements);
    await Sensor.save(request.sensor);

    return measurements;
  }
}