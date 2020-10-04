import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '~app.module';
import {
  ForwarderFixture,
  ForwarderFixtureInterface
} from '~modules/forwarder/forwarder.fixture';
import { UserAuthInterface } from '~modules/user/user.interfaces';
import { initPipes } from '~utils/app.utils';
import { BoardTypeEnum } from '~utils/board-types.enum';

describe('ForwarderController (e2e)', () => {
  let app: INestApplication;
  let fixture: ForwarderFixtureInterface;
  let userAuth: UserAuthInterface;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    initPipes(app);
    await app.init();
    fixture = await ForwarderFixture(app);
    userAuth = await fixture.userAuth();
  });

  it('/forwarders (POST)', () => {
    return request(app.getHttpServer())
      .post('/forwarders')
      .set({ authorization: `Bearer ${userAuth.accessToken}` })
      .send({
        name: 'Test forwarder',
        boardType: BoardTypeEnum.DOIT_ESP32_DEVKIT_V1,
        location: 'Living room',
      })
      .expect(201);
  });

  it('/forwarders (GET)', () => {
    return request(app.getHttpServer()).get('/forwarders').expect(200);
  });

  it('/forwarders/my (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/forwarders/my')
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
