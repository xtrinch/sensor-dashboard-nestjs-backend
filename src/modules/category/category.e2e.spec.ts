import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '~app.module';
import {
  CategoryFixture,
  CategoryFixtureInterface,
} from '~modules/category/category.fixture';
import { UserAuthInterface } from '~modules/user/user.interfaces';
import { initPipes } from '~utils/app.utils';

describe('CategoryController (e2e)', () => {
  let app: INestApplication;
  let fixture: CategoryFixtureInterface;
  let userAuth: UserAuthInterface;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    initPipes(app);
    await app.init();
    fixture = await CategoryFixture(app);
    userAuth = await fixture.userAuth();
  });

  it('/categories (POST)', () => {
    return request(app.getHttpServer())
      .post('/categories')
      .set({ authorization: `Bearer ${userAuth.accessToken}` })
      .send({
        name: 'A category',
      })
      .expect(201);
  });

  it('/categories (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/categories')
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
