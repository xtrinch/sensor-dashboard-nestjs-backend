import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import {
  CategoryFixture,
  CategoryFixtureInterface,
} from '~modules/category/category.fixture';
import { UserAuthInterface } from '~modules/user/user.interfaces';
import { initPipes } from '~utils/app.utils';
import { createTestingApp } from '~utils/test-utils';

describe('CategoryController (e2e)', () => {
  let app: INestApplication;
  let fixture: CategoryFixtureInterface;
  let userAuth: UserAuthInterface;

  beforeAll(async () => {
    app = await createTestingApp();
    initPipes(app);
    await app.init();
    fixture = await CategoryFixture(app);
    userAuth = await fixture.userAuth();
  });

  it('/categories (POST)', () => {
    return request(app.getHttpServer())
      .post('/categories')
      .set({ authorization: userAuth.user.id })
      .send({
        name: 'A category',
        protected: false,
      })
      .expect(201);
  });

  it('/categories (GET)', async () => {
    await request(app.getHttpServer())
      .get('/categories?offset=0&page=1')
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
