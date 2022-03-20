import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { AppModule } from '~app.module';
import {
  CommentFixture,
  CommentFixtureInterface,
} from '~modules/comment/comment.fixture';
import { CommentService } from '~modules/comment/comment.service';
import { CommentCreateDto } from '~modules/comment/dto/comment.create.dto';
import { CommentUpdateDto } from '~modules/comment/dto/comment.update.dto';

describe('CommentService', () => {
  let commentService: CommentService;
  let module: TestingModule = null;
  let fixture: CommentFixtureInterface;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    commentService = module.get<CommentService>(CommentService);
    fixture = await CommentFixture(module);
  }, 20000);

  it('should create a comment', async () => {
    const data = plainToClass(CommentCreateDto, {
      description: 'A markdown comment',
      topicId: fixture.topicOne.id,
      categoryId: fixture.categoryOne.id,
      name: 'Re: comment',
    });

    await validateOrReject(data);
    const comment = await commentService.create(fixture.userRequest, data);
    expect(comment).toBeDefined();
    expect(comment.description).toBeDefined();
  });

  it('should update a comment', async () => {
    const data = plainToClass(CommentUpdateDto, {
      description: 'A markdown comment',
      name: 'Test',
    });

    await validateOrReject(data);
    const comment = await commentService.update(
      { id: fixture.commentOne.id },
      data,
    );
    expect(comment).toBeDefined();
    expect(comment.description).toEqual('A markdown comment');
  });

  it('should list comments', async () => {
    const comments = await commentService.findAll(
      {
        topicId: fixture.topicOne.id,
        categoryId: fixture.categoryOne.id,
      },
      {},
      {
        limit: 20,
        page: 1,
      },
    );

    expect(comments.items.length).not.toBe(0);
  });

  it('should delete a comment', async () => {
    const success = await commentService.delete({
      id: fixture.commentOne.id,
    });

    expect(success).toEqual(true);
  });

  afterAll(async () => {
    await module.close();
  });
});
