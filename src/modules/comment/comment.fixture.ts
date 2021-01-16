import { INestApplication } from '@nestjs/common';
import { NestApplicationContext } from '@nestjs/core';
import { plainToClass } from 'class-transformer';
import { Comment } from '~modules/comment/comment.entity';
import { CommentService } from '~modules/comment/comment.service';
import { CommentCreateDto } from '~modules/comment/dto/comment.create.dto';
import { MeasurementTypeEnum } from '~modules/measurement/enum/measurement-type.enum';
import { UserFixture, UserFixtureInterface } from '~modules/user/user.fixture';
import { BoardTypeEnum } from '~utils/board-types.enum';

export interface CommentFixtureInterface extends UserFixtureInterface {
  commentOne: Comment;
}

export async function CommentFixture(
  module: NestApplicationContext | INestApplication,
  dedupe: any | CommentFixtureInterface = {},
): Promise<CommentFixtureInterface> {
  if (dedupe.commentOne) return dedupe;
  const fixture = await UserFixture(module, dedupe);
  const commentService = await module.get<CommentService>(CommentService);

  const commentOne = await commentService.create(
    fixture.userRequest,
    plainToClass(CommentCreateDto, {
      name: 'Test comment',
      location: 'Living room',
      boardType: BoardTypeEnum.NODEMCU_ESP8266,
      measurementTypes: Object.values(MeasurementTypeEnum),
    }),
  );

  return { ...fixture, commentOne };
}
