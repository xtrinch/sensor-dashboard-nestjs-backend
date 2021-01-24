import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '~app.module';
import {
  CommentFixture,
  CommentFixtureInterface
} from '~modules/comment/comment.fixture';
import { UserAuthInterface } from '~modules/user/user.interfaces';
import { initPipes } from '~utils/app.utils';

describe('CommentController (e2e)', () => {
  let app: INestApplication;
  let fixture: CommentFixtureInterface;
  let userAuth: UserAuthInterface;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    initPipes(app);
    await app.init();
    fixture = await CommentFixture(app);
    userAuth = await fixture.userAuth();
  });

  it('/comments (POST)', () => {
    return request(app.getHttpServer())
      .post('/comments')
      .set({ authorization: `Bearer ${userAuth.accessToken}` })
      .send({
        description: { blocks: [], entityMap: {} },
        topicId: fixture.topicOne.id,
        categoryId: fixture.categoryOne.id,
        name: 'Re: comment'
      })
      .expect(201);
  });

  it('/comments (GET)', async () => {
    await request(app.getHttpServer()).get(`/comments?categoryId=${fixture.categoryOne.id}&topicId=${fixture.topicOne.id}`).expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
