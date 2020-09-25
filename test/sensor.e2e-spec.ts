import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '~app.module';
import { MeasurementTypeEnum } from '~modules/measurement/enum/measurement-type.enum';
import { BoardTypeEnum } from '~modules/sensor/enum/sensor-types.enum';
import {
  SensorFixture,
  SensorFixtureInterface,
} from '~modules/sensor/sensor.fixture';
import { UserAuthInterface } from '~modules/user/user.interfaces';
import { initPipes } from '~utils/app.utils';

describe('SensorController (e2e)', () => {
  let app: INestApplication;
  let fixture: SensorFixtureInterface;
  let userAuth: UserAuthInterface;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    initPipes(app);
    await app.init();
    fixture = await SensorFixture(app);
    userAuth = await fixture.userAuth();
  });

  it('/sensors (POST)', () => {
    return request(app.getHttpServer())
      .post('/sensors')
      .set({ authorization: `Bearer ${userAuth.accessToken}` })
      .send({
        name: 'Test sensor',
        displayName: 'Test sensor',
        boardType: BoardTypeEnum.BME680,
        location: 'Living room',
        measurementTypes: [MeasurementTypeEnum.GAS],
        timezone: 'Europe/Vienna',
      })
      .expect(201);
  });

  it('/sensors (GET)', () => {
    return request(app.getHttpServer()).get('/sensors').expect(200);
  });

  it('/sensors/my (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/sensors/my')
      .set({ authorization: `Bearer ${userAuth.accessToken}` })
      .expect(200);

    expect(response.body.items.length).toBeGreaterThan(0);
    expect(response.body.items[0].accessToken).toBeDefined();
  });

  afterAll(async () => {
    await app.close();
  });
});
