import { INestApplication } from '@nestjs/common';
import { NestApplicationContext } from '@nestjs/core';
import { plainToClass } from 'class-transformer';
import { ForwarderCreateDto } from '~modules/forwarder/dto/forwarder.create.dto';
import { Forwarder } from '~modules/forwarder/forwarder.entity';
import {
  ForwarderAuthInterface,
  ForwarderRequest,
} from '~modules/forwarder/forwarder.interfaces';
import { ForwarderService } from '~modules/forwarder/forwarder.service';
import {
  SensorFixture,
  SensorFixtureInterface,
} from '~modules/sensor/sensor.fixture';
import { BoardTypeEnum } from '~utils/board-types.enum';

export interface ForwarderFixtureInterface extends SensorFixtureInterface {
  forwarderOne: Forwarder;
  forwarderRequest: ForwarderRequest;
  forwarderAuth: () => Promise<ForwarderAuthInterface>;
}

export async function ForwarderFixture(
  module: NestApplicationContext | INestApplication,
  dedupe: any | ForwarderFixtureInterface = {},
): Promise<ForwarderFixtureInterface> {
  if (dedupe.forwarderOne) return dedupe;
  const fixture = await SensorFixture(module, dedupe);

  const forwarderService = await module.get<ForwarderService>(ForwarderService);

  const forwarderOne = await forwarderService.create(
    fixture.userRequest,
    plainToClass(ForwarderCreateDto, {
      name: 'Test forwarder',
      location: 'Living room',
      boardType: BoardTypeEnum.DOIT_ESP32_DEVKIT_V1,
    }),
  );

  const forwarderRequest = {
    forwarder: forwarderOne,
    sensor: fixture.sensorOne,
  } as ForwarderRequest;

  const forwarderAuth = async () => {
    return {
      accessToken: forwarderOne.accessToken,
    };
  };

  return { ...fixture, forwarderOne, forwarderRequest, forwarderAuth };
}
