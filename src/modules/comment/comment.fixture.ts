import { INestApplication } from '@nestjs/common';
import { NestApplicationContext } from '@nestjs/core';
import { plainToClass } from 'class-transformer';
import { Comment } from '~modules/comment/comment.entity';
import { CommentService } from '~modules/comment/comment.service';
import { CommentCreateDto } from '~modules/comment/dto/comment.create.dto';
import {
  TopicFixture,
  TopicFixtureInterface,
} from '~modules/topic/topic.fixture';

export interface CommentFixtureInterface extends TopicFixtureInterface {
  commentOne: Comment;
}

export async function CommentFixture(
  module: NestApplicationContext | INestApplication,
  dedupe: any | CommentFixtureInterface = {},
): Promise<CommentFixtureInterface> {
  if (dedupe.commentOne) return dedupe;
  const fixture = await TopicFixture(module, dedupe);
  const commentService = await module.get<CommentService>(CommentService);

  const commentOne = await commentService.create(
    fixture.userRequest,
    plainToClass(CommentCreateDto, {
      description: { blocks: [], entityMap: '' },
      topicId: fixture.topicOne.id,
    }),
  );

  return { ...fixture, commentOne };
}
