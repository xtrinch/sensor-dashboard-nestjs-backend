import { INestApplication } from '@nestjs/common';
import { NestApplicationContext } from '@nestjs/core';
import { plainToClass } from 'class-transformer';
import { MeasurementTypeEnum } from '~modules/measurement/enum/measurement-type.enum';
import { TopicCreateDto } from '~modules/topic/dto/topic.create.dto';
import { Topic } from '~modules/topic/topic.entity';
import { TopicService } from '~modules/topic/topic.service';
import { UserFixture, UserFixtureInterface } from '~modules/user/user.fixture';
import { BoardTypeEnum } from '~utils/board-types.enum';

export interface TopicFixtureInterface extends UserFixtureInterface {
  topicOne: Topic;
}

export async function TopicFixture(
  module: NestApplicationContext | INestApplication,
  dedupe: any | TopicFixtureInterface = {},
): Promise<TopicFixtureInterface> {
  if (dedupe.topicOne) return dedupe;
  const fixture = await UserFixture(module, dedupe);
  const topicService = await module.get<TopicService>(TopicService);

  const topicOne = await topicService.create(
    fixture.userRequest,
    plainToClass(TopicCreateDto, {
      name: 'Test topic',
      location: 'Living room',
      boardType: BoardTypeEnum.NODEMCU_ESP8266,
      measurementTypes: Object.values(MeasurementTypeEnum),
    }),
  );

  return { ...fixture, topicOne };
}
