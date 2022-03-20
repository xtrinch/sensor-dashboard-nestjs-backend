import { INestApplication } from '@nestjs/common';
import 'reflect-metadata';
import * as request from 'supertest';
import { MeasurementTypeEnum } from '~modules/measurement/enum/measurement-type.enum';
import { SensorTypeEnum } from '~modules/sensor/enum/sensor-types.enum';
import {
  SensorFixture,
  SensorFixtureInterface,
} from '~modules/sensor/sensor.fixture';
import { UserAuthInterface } from '~modules/user/user.interfaces';
import { initPipes } from '~utils/app.utils';
import { BoardTypeEnum } from '~utils/board-types.enum';
import { createTestingApp } from '~utils/test-utils';

describe('SensorController (e2e)', () => {
  let app: INestApplication;
  let fixture: SensorFixtureInterface;
  let userAuth: UserAuthInterface;

  beforeAll(async () => {
    app = await createTestingApp();

    initPipes(app);
    await app.init();
    fixture = await SensorFixture(app);
    userAuth = await fixture.userAuth();
  });

  it('/sensors (POST)', () => {
    return request(app.getHttpServer())
      .post('/sensors')
      .set({ authorization: userAuth.user.id })
      .send({
        name: 'Test sensor',
        displayName: 'Test sensor',
        boardType: BoardTypeEnum.DOIT_ESP32_DEVKIT_V1,
        location: 'Living room',
        measurementTypes: [MeasurementTypeEnum.GAS],
        timezone: 'Europe/Vienna',
        sensorTypes: [SensorTypeEnum.BME280],
        private: true,
      })
      .expect(201);
  });

  it('/sensors (GET)', () => {
    return request(app.getHttpServer()).get('/sensors').expect(200);
  });

  it('/sensors/my (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/sensors/my')
      .set({ authorization: userAuth.user.id })
      .expect(200);

    expect(response.body.items.length).toBeGreaterThan(0);
    expect(response.body.items[0].accessToken).toBeDefined();
    expect(response.body.items[0].userId).toEqual(userAuth.user?.id);
  });

  afterAll(async () => {
    await app.close();
  });
});
