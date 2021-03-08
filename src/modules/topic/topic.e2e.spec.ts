import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '~app.module';
import {
  TopicFixture,
  TopicFixtureInterface,
} from '~modules/topic/topic.fixture';
import { UserAuthInterface } from '~modules/user/user.interfaces';
import { initPipes } from '~utils/app.utils';

describe('TopicController (e2e)', () => {
  let app: INestApplication;
  let fixture: TopicFixtureInterface;
  let userAuth: UserAuthInterface;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    initPipes(app);
    await app.init();
    fixture = await TopicFixture(app);
    userAuth = await fixture.userAuth();
  });

  it('/topics (POST)', () => {
    return request(app.getHttpServer())
      .post('/topics')
      .set({ authorization: `Bearer ${userAuth.accessToken}` })
      .send({
        name: 'Topic name',
        categoryId: fixture.categoryOne.id,
        description: "A description",
      })
      .expect(201);
  });

  it('/topics (GET)', async () => {
    await request(app.getHttpServer())
      .get(`/topics?categoryId=${fixture.categoryOne.id}`)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
