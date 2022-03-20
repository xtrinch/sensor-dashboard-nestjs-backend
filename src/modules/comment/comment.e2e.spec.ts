import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import {
  CommentFixture,
  CommentFixtureInterface,
} from '~modules/comment/comment.fixture';
import { UserAuthInterface } from '~modules/user/user.interfaces';
import { initPipes } from '~utils/app.utils';
import { createTestingApp } from '~utils/test-utils';

describe('CommentController (e2e)', () => {
  let app: INestApplication;
  let fixture: CommentFixtureInterface;
  let userAuth: UserAuthInterface;

  beforeAll(async () => {
    app = await createTestingApp();

    initPipes(app);
    await app.init();
    fixture = await CommentFixture(app);
    userAuth = await fixture.userAuth();
  });

  it('/comments (POST)', () => {
    return request(app.getHttpServer())
      .post('/comments')
      .set({ authorization: userAuth.user.id })
      .send({
        description: 'A description',
        topicId: fixture.topicOne.id,
        categoryId: fixture.categoryOne.id,
        name: 'Re: comment',
      })
      .expect(201);
  });

  it('/comments (GET)', async () => {
    await request(app.getHttpServer())
      .get(
        `/comments?categoryId=${fixture.categoryOne.id}&topicId=${fixture.topicOne.id}`,
      )
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
