import { INestApplication } from '@nestjs/common';
import { NestApplicationContext } from '@nestjs/core';
import { plainToClass } from 'class-transformer';
import { RadioCreateDto } from '~modules/radio/dto/radio.create.dto';
import { Radio } from '~modules/radio/radio.entity';
import {
  RadioAuthInterface,
  RadioRequest
} from '~modules/radio/radio.interfaces';
import { RadioService } from '~modules/radio/radio.service';
import {
  SensorFixture,
  SensorFixtureInterface
} from '~modules/sensor/sensor.fixture';
import { BoardTypeEnum } from '~utils/board-types.enum';

export interface RadioFixtureInterface extends SensorFixtureInterface {
  radioOne: Radio;
  radioRequest: RadioRequest;
  radioAuth: () => Promise<RadioAuthInterface>;
}

export async function RadioFixture(
  module: NestApplicationContext | INestApplication,
  dedupe: any | RadioFixtureInterface = {},
): Promise<RadioFixtureInterface> {
  if (dedupe.radioOne) return dedupe;
  const fixture = await SensorFixture(module, dedupe);

  const radioService = await module.get<RadioService>(RadioService);

  const radioOne = await radioService.create(
    fixture.userRequest,
    plainToClass(RadioCreateDto, {
      name: 'Test radio',
      location: 'Living room',
      boardType: BoardTypeEnum.DOIT_ESP32_DEVKIT_V1,
    }),
  );

  const radioRequest = {
    radio: radioOne,
    sensor: fixture.sensorOne,
  } as RadioRequest;

  const radioAuth = async () => {
    return {
      accessToken: radioOne.accessToken,
    };
  };

  return { ...fixture, radioOne, radioRequest, radioAuth };
}
