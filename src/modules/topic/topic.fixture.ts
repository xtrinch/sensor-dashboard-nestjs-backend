import { INestApplication } from '@nestjs/common';
import { NestApplicationContext } from '@nestjs/core';
import { plainToClass } from 'class-transformer';
import {
  CategoryFixture,
  CategoryFixtureInterface,
} from '~modules/category/category.fixture';
import { TopicCreateDto } from '~modules/topic/dto/topic.create.dto';
import { Topic } from '~modules/topic/topic.entity';
import { TopicService } from '~modules/topic/topic.service';

export interface TopicFixtureInterface extends CategoryFixtureInterface {
  topicOne: Topic;
}

export async function TopicFixture(
  module: NestApplicationContext | INestApplication,
  dedupe: any | TopicFixtureInterface = {},
): Promise<TopicFixtureInterface> {
  if (dedupe.topicOne) return dedupe;
  const categoryFixture = await CategoryFixture(module, dedupe);

  const topicService = await module.get<TopicService>(TopicService);

  const topicOne = await topicService.create(
    categoryFixture.userRequest,
    plainToClass(TopicCreateDto, {
      name: 'Test topic',
      categoryId: categoryFixture.categoryOne.id,
      description: {},
    }),
  );

  return { ...categoryFixture, topicOne };
}
