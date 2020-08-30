import { INestApplication } from '@nestjs/common';
import { NestApplicationContext } from '@nestjs/core';
import { plainToClass } from 'class-transformer';
import { Display } from '~modules/display/display.entity';
import { DisplayRequest } from '~modules/display/display.guard';
import { DisplayService } from '~modules/display/display.service';
import { DisplayCreateDto } from '~modules/display/dto/display.create.dto';
import { DisplayBoardTypesEnum } from '~modules/display/enum/display-board-types.enum';
import { MeasurementTypeEnum } from '~modules/measurement/enum/measurement-type.enum';
import {
  SensorFixture,
  SensorFixtureInterface,
} from '~modules/sensor/sensor.fixture';

export interface DisplayFixtureInterface extends SensorFixtureInterface {
  displayOne: Display;
  displayRequest: DisplayRequest;
}

export async function DisplayFixture(
  module: NestApplicationContext | INestApplication,
  deduplicate: any | DisplayFixtureInterface = {},
): Promise<DisplayFixtureInterface> {
  if (deduplicate.displayOne) return deduplicate;
  const fixture = await SensorFixture(module, deduplicate);

  const displayService = await module.get<DisplayService>(DisplayService);

  const displayOne = await displayService.create(
    fixture.userRequest,
    plainToClass(DisplayCreateDto, {
      name: 'Test display',
      location: 'Living room',
      boardType: DisplayBoardTypesEnum.STM32F769NI,
      sensorIds: [fixture.sensorOne.id],
      measurementTypes: Object.values(MeasurementTypeEnum),
    }),
  );

  const displayRequest = {
    display: displayOne,
  } as DisplayRequest;

  return { ...fixture, displayOne, displayRequest };
}
