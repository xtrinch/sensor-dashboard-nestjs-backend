import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '~app.module';
import { UserFixture, UserFixtureInterface } from '~modules/user/user.fixture';
import { UserAuthInterface } from '~modules/user/user.interfaces';
import { initPipes } from '~utils/app.utils';

describe('SensorController (e2e)', () => {
  let app: INestApplication;
  let fixture: UserFixtureInterface;
  let userAuth: UserAuthInterface;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    initPipes(app);
    await app.init();
    fixture = await UserFixture(app);
    userAuth = await fixture.userAuth();
  });

  it('/sensors (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/users')
      .expect(200);
    expect(response.body.items.length).toEqual(1);
    expect(response.body.items[0].name).toEqual(fixture.userOne.name);
  });

  afterAll(async () => {
    await app.close();
  });
});
