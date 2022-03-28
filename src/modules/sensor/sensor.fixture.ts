import { INestApplication } from '@nestjs/common';
import { NestApplicationContext } from '@nestjs/core';
import { plainToClass } from 'class-transformer';
import { MeasurementTypeEnum } from '~modules/measurement/enum/measurement-type.enum';
import { SensorCreateDto } from '~modules/sensor/dto/sensor.create.dto';
import { SensorTypeEnum } from '~modules/sensor/enum/sensor-types.enum';
import { Sensor } from '~modules/sensor/sensor.entity';
import { SensorRequest } from '~modules/sensor/sensor.guard';
import { SensorService } from '~modules/sensor/sensor.service';
import { UserFixture, UserFixtureInterface } from '~modules/user/user.fixture';
import { BoardTypeEnum } from '~utils/board-types.enum';

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

  const sensorService = module.get<SensorService>(SensorService);

  const sensorOne = await sensorService.create(
    userFixture.userRequest,
    plainToClass(SensorCreateDto, {
      name: 'Test sensor',
      displayName: 'Test sensor',
      boardType: BoardTypeEnum.FIREBEETLE_ESP8266,
      location: 'Living room',
      private: false,
      sensorTypes: [SensorTypeEnum.BME680],
      measurementTypes: [MeasurementTypeEnum.GAS],
      color: '#ffffff',
    }),
  );

  const sensorRequest = {
    sensor: sensorOne,
  } as SensorRequest;

  return { ...userFixture, sensorOne, sensorRequest };
}
