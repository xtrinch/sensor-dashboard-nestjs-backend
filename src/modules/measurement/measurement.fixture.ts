import { INestApplication } from '@nestjs/common';
import { NestApplicationContext } from '@nestjs/core';
import { plainToClass } from 'class-transformer';
import { MeasurementCreateDto } from '~modules/measurement/dto/measurement.create.dto';
import { MeasurementTypeEnum } from '~modules/measurement/enum/measurement-type.enum';
import { Measurement } from '~modules/measurement/measurement.entity';
import { MeasurementService } from '~modules/measurement/measurement.service';
import {
  SensorFixture,
  SensorFixtureInterface,
} from '~modules/sensor/sensor.fixture';

export interface MeasurementFixtureInterface extends SensorFixtureInterface {
  measurementOne: Measurement;
}

export async function MeasurementFixture(
  module: NestApplicationContext | INestApplication,
  deduplicate: any | MeasurementFixtureInterface = {},
): Promise<MeasurementFixtureInterface> {
  if (deduplicate.measurementOne) return deduplicate;
  const sensorFixture = await SensorFixture(module, deduplicate);
  const measurementService = await module.get<MeasurementService>(
    MeasurementService,
  );

  const measurementOne = await measurementService.create(
    sensorFixture.sensorRequest,
    plainToClass(MeasurementCreateDto, {
      measurement: 12.2,
      measurementType: MeasurementTypeEnum.GAS,
    }),
  );

  return { ...sensorFixture, measurementOne };
}
