import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '~app.module';
import {
  DisplayFixture,
  DisplayFixtureInterface,
} from '~modules/display/display.fixture';
import { DisplayTypeEnum } from '~modules/display/enum/display-types.enum';
import { MeasurementTypeEnum } from '~modules/measurement/enum/measurement-type.enum';
import { UserAuthInterface } from '~modules/user/user.interfaces';
import { initPipes } from '~utils/app.utils';
import { BoardTypeEnum } from '~utils/board-types.enum';

describe('DisplayController (e2e)', () => {
  let app: INestApplication;
  let fixture: DisplayFixtureInterface;
  let userAuth: UserAuthInterface;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    initPipes(app);
    await app.init();
    fixture = await DisplayFixture(app);
    userAuth = await fixture.userAuth();
  });

  it('/displays (POST)', () => {
    return request(app.getHttpServer())
      .post('/displays')
      .set({ authorization: `Bearer ${userAuth.accessToken}` })
      .send({
        name: 'Test display',
        displayName: 'Test display',
        boardType: BoardTypeEnum.DOIT_ESP32_DEVKIT_V1,
        location: 'Living room',
        measurementTypes: [MeasurementTypeEnum.GAS],
        sensorIds: [fixture.sensorOne.id],
        displayType: DisplayTypeEnum.NOKIA_PCD8544,
      })
      .expect(201);
  });

  it('/displays (GET)', () => {
    return request(app.getHttpServer()).get('/displays').expect(200);
  });

  it('/displays/my (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/displays/my')
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
