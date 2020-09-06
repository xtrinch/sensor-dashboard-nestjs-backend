import { INestApplication } from '@nestjs/common';
import { NestApplicationContext } from '@nestjs/core';
import { plainToClass } from 'class-transformer';
import { SensorCreateDto } from '~modules/sensor/dto/sensor.create.dto';
import { SensorBoardTypesEnum } from '~modules/sensor/enum/sensor-board-types.enum';
import { Sensor } from '~modules/sensor/sensor.entity';
import { SensorRequest } from '~modules/sensor/sensor.guard';
import { SensorService } from '~modules/sensor/sensor.service';
import { UserFixture, UserFixtureInterface } from '~modules/user/user.fixture';

export interface SensorFixtureInterface extends UserFixtureInterface {
  sensorOne: Sensor;
  sensorRequest: SensorRequest;
}

export async function SensorFixture(
  module: NestApplicationContext | INestApplication,
  dedupe: any | SensorFixtureInterface = {},
): Promise<SensorFixtureInterface> {
  if (dedupe.sensorOne) return dedupe;
  const userFixture = await UserFixture(module, dedupe);

  const sensorService = await module.get<SensorService>(SensorService);

  const sensorOne = await sensorService.create(
    userFixture.userRequest,
    plainToClass(SensorCreateDto, {
      name: 'Test sensor',
      displayName: 'Test sensor',
      boardType: SensorBoardTypesEnum.BME680,
      location: 'Living room',
    }),
  );

  const sensorRequest = {
    sensor: sensorOne,
  } as SensorRequest;

  return { ...userFixture, sensorOne, sensorRequest };
}
