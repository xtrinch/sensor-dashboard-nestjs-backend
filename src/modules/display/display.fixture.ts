import { INestApplication } from '@nestjs/common';
import { NestApplicationContext } from '@nestjs/core';
import { plainToClass } from 'class-transformer';
import { Display } from '~modules/display/display.entity';
import { DisplayRequest } from '~modules/display/display.guard';
import { DisplayService } from '~modules/display/display.service';
import { DisplayCreateDto } from '~modules/display/dto/display.create.dto';
import { DisplayBoardTypesEnum } from '~modules/display/enum/display-board-types.enum';
import { UserFixture, UserFixtureInterface } from '~modules/user/user.fixture';

export interface DisplayFixtureInterface extends UserFixtureInterface {
  displayOne: Display;
  displayRequest: DisplayRequest;
}

export async function DisplayFixture(
  module: NestApplicationContext | INestApplication,
  deduplicate: any | DisplayFixtureInterface = {},
): Promise<DisplayFixtureInterface> {
  if (deduplicate.displayOne) return deduplicate;
  const userFixture = await UserFixture(module, deduplicate);

  const displayService = await module.get<DisplayService>(DisplayService);

  const displayOne = await displayService.create(
    userFixture.userRequest,
    plainToClass(DisplayCreateDto, {
      name: 'Test display',
      location: 'Living room',
      boardType: DisplayBoardTypesEnum.STM32F769NI,
    }),
  );

  const displayRequest = {
    display: displayOne,
  } as DisplayRequest;

  return { ...userFixture, displayOne, displayRequest };
}
