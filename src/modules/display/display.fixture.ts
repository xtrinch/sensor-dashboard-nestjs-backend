import { INestApplication } from '@nestjs/common';
import { NestApplicationContext } from '@nestjs/core';
import { plainToClass } from 'class-transformer';
import { Display } from '~modules/display/display.entity';
import {
  DisplayAuthInterface,
  DisplayRequest,
} from '~modules/display/display.interfaces';
import { DisplayService } from '~modules/display/display.service';
import { DisplayCreateDto } from '~modules/display/dto/display.create.dto';
import { DisplayTypeEnum } from '~modules/display/enum/display-types.enum';
import { MeasurementTypeEnum } from '~modules/measurement/enum/measurement-type.enum';
import {
  SensorFixture,
  SensorFixtureInterface,
} from '~modules/sensor/sensor.fixture';

export interface DisplayFixtureInterface extends SensorFixtureInterface {
  displayOne: Display;
  displayTwo: Display;
  displayRequest: DisplayRequest;
  displayAuth: () => Promise<DisplayAuthInterface>;
}

export async function DisplayFixture(
  module: NestApplicationContext | INestApplication,
  dedupe: any | DisplayFixtureInterface = {},
): Promise<DisplayFixtureInterface> {
  if (dedupe.displayOne) return dedupe;
  const fixture = await SensorFixture(module, dedupe);

  const displayService = await module.get<DisplayService>(DisplayService);

  const displayOne = await displayService.create(
    fixture.userRequest,
    plainToClass(DisplayCreateDto, {
      name: 'Test display',
      location: 'Living room',
      sensorIds: [fixture.sensorOne.id],
      measurementTypes: Object.values(MeasurementTypeEnum),
      displayType: DisplayTypeEnum.CUSTOM,
    }),
  );

  const displayTwo = await displayService.create(
    fixture.userRequest,
    plainToClass(DisplayCreateDto, {
      name: 'Test display1',
      location: 'Living room',
      sensorIds: [fixture.sensorOne.id],
      measurementTypes: Object.values(MeasurementTypeEnum),
      displayType: DisplayTypeEnum.CANVAS,
      state: {
        objects: [
          {
            left: 3,
            top: 3,
          },
        ],
      },
    }),
  );

  const displayRequest = {
    display: displayOne,
  } as DisplayRequest;

  const displayAuth = async () => {
    return {
      accessToken1: displayOne.accessToken,
      accessToken2: displayTwo.accessToken,
    };
  };

  return { ...fixture, displayOne, displayTwo, displayRequest, displayAuth };
}
