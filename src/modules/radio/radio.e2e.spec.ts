import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '~app.module';
import {
  RadioFixture,
  RadioFixtureInterface
} from '~modules/radio/radio.fixture';
import { UserAuthInterface } from '~modules/user/user.interfaces';
import { initPipes } from '~utils/app.utils';
import { BoardTypeEnum } from '~utils/board-types.enum';

describe('RadioController (e2e)', () => {
  let app: INestApplication;
  let fixture: RadioFixtureInterface;
  let userAuth: UserAuthInterface;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    initPipes(app);
    await app.init();
    fixture = await RadioFixture(app);
    userAuth = await fixture.userAuth();
  });

  it('/radios (POST)', () => {
    return request(app.getHttpServer())
      .post('/radios')
      .set({ authorization: `Bearer ${userAuth.accessToken}` })
      .send({
        name: 'Test radio',
        boardType: BoardTypeEnum.DOIT_ESP32_DEVKIT_V1,
        location: 'Living room',
      })
      .expect(201);
  });

  it('/radios (GET)', () => {
    return request(app.getHttpServer()).get('/radios').expect(200);
  });

  it('/radios/my (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/radios/my')
      .set({ authorization: `Bearer ${userAuth.accessToken}` })
      .expect(200);

    expect(response.body.items.length).toBeGreaterThan(0);
    expect(response.body.items[0].accessToken).toBeDefined();
    expect(response.body.items[0].userId).toEqual(userAuth.user?.id);
  });

  afterAll(async () => {
    await app.close();
  });
});
