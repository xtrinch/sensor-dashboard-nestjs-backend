import { INestApplication } from '@nestjs/common';
import { NestApplicationContext } from '@nestjs/core';
import { plainToClass } from 'class-transformer';
import { SensorService } from '~modules/sensor/sensor.service';
import Sensor from '~modules/sensor/sensor.entity';
import { SensorCreateDto } from '~modules/sensor/dto/sensor.create.dto';
import { SensorBoardTypesEnum } from '~modules/sensor/enum/sensor-board-types.enum';
import { SensorRequest } from '~modules/sensor/sensor.guard';

export interface SensorFixtureInterface {
  sensorOne: Sensor;
  sensorRequest: SensorRequest;
}

export async function SensorFixture(
  module: NestApplicationContext | INestApplication,
  deduplicate: any | SensorFixtureInterface = {},
): Promise<SensorFixtureInterface> {
  if (deduplicate.sensorOne) return deduplicate;
  const sensorService = await module.get<SensorService>(SensorService);

  const sensorOne = await sensorService.create(
    plainToClass(SensorCreateDto, {
      name: 'Test sensor',
      boardType: SensorBoardTypesEnum.BME680,
      location: 'Living room',
    }),
  );

  const sensorRequest = {
    sensor: sensorOne,
  } as SensorRequest;

  return { sensorOne, sensorRequest };
}
