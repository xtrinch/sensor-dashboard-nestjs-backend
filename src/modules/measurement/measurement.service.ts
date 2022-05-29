import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { addSeconds } from 'date-fns';
import { round } from 'lodash';
import { Display } from '~modules/display/display.entity';
import { BoardObjectInterface } from '~modules/display/display.interfaces';
import { Forwarder } from '~modules/forwarder/forwarder.entity';
import { MeasurementCreateDto } from '~modules/measurement/dto/measurement.create.dto';
import { MeasurementListCreateDto } from '~modules/measurement/dto/measurement.list.create.dto';
import { MeasurementQueryDto } from '~modules/measurement/dto/measurement.query.dto';
import {
  DisplayMeasurementAggregateInterface,
  MeasurementAggregateInterface,
  MeasurementWhereInterface,
} from '~modules/measurement/measurement.interfaces';
import { MeasurementRepository } from '~modules/measurement/measurement.repository';
import { Sensor } from '~modules/sensor/sensor.entity';
import { DateRange } from '~utils/date.range';
import { MeasurementTypeEnum } from './enum/measurement-type.enum';
import { Measurement } from './measurement.entity';
import { measurementTypeProperties } from './measurement.types';

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
    display: Display,
  ): Promise<DisplayMeasurementAggregateInterface> {
    display.lastSeenAt = new Date();
    await Display.save(display);

    const results = await this.measurementRepository.getLatest({
      measurementTypes: display.measurementTypes || [],
      sensorIds: (display.sensors || []).map((s) => s.id),
    });

    return results;
  }

  public async getLatest(
    where: MeasurementWhereInterface,
  ): Promise<DisplayMeasurementAggregateInterface> {
    const results = await this.measurementRepository.getLatest(where);
    return results;
  }

  public checkMeasurementBounds(
    actualMeasurement: number,
    measurementType: MeasurementTypeEnum,
  ): void {
    const cfg = measurementTypeProperties[measurementType];
    if (
      cfg.domain[0] > actualMeasurement ||
      cfg.domain[1] < actualMeasurement
    ) {
      throw new BadRequestException('Measurement out of bounds');
    }
  }

  public async create(
    sensor: Sensor,
    data: MeasurementCreateDto,
    forwarder?: Forwarder,
  ): Promise<Measurement> {
    const measurementType = data.measurementType;
    const actualMeasurement = round(data.measurement, 2);

    this.checkMeasurementBounds(actualMeasurement, measurementType);

    const measurement = new Measurement();
    measurement.measurement = actualMeasurement;
    measurement.measurementType = measurementType;
    measurement.sensor = sensor;
    measurement.sensorId = sensor.id;

    sensor.lastSeenAt = new Date();

    if (forwarder) {
      forwarder.lastSeenAt = new Date();
      forwarder.numForwarded += 1;
      await Forwarder.save(forwarder);
    }

    await Measurement.save(measurement);
    await Sensor.save(sensor);

    return measurement;
  }

  public async createMultiple(
    sensor: Sensor,
    data: MeasurementListCreateDto,
    forwarder?: Forwarder,
  ): Promise<Measurement[]> {
    const measurements: Measurement[] = [];

    for (const measurementData of data.measurements.reverse()) {
      const measurementType = measurementData.measurementType;
      const actualMeasurement = round(measurementData.measurement, 2);

      // we'll allow for at least some measurements to be input and not
      // throw if one of them doesn't fit the criteria
      try {
        this.checkMeasurementBounds(actualMeasurement, measurementType);
      } catch (e) {
        continue;
      }

      const measurement = new Measurement();
      measurement.measurement = actualMeasurement;
      measurement.measurementType = measurementType;
      measurement.sensor = sensor;
      if (measurementData.timeAgo) {
        measurement.createdAt = addSeconds(
          new Date(),
          -measurementData.timeAgo,
        );
      }
      measurements.push(measurement);
    }

    sensor.lastSeenAt = new Date();

    if (forwarder) {
      forwarder.lastSeenAt = new Date();
      forwarder.numForwarded += 1;
      await Forwarder.save(forwarder);
    }

    await Measurement.save(measurements);
    await Sensor.save(sensor);

    return measurements;
  }

  public async getCanvasData(display: Display): Promise<{
    measurements: DisplayMeasurementAggregateInterface;
    objects: BoardObjectInterface[];
  }> {
    const measurements = await this.getLatestMeasurements(display);

    const objects = display.state.objects || [];

    return {
      measurements,
      objects,
    };
  }
}
