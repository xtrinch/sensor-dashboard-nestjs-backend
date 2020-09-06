import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '~app.module';
import { DisplayAuthInterface } from '~modules/display/display.interfaces';
import { MeasurementTypeEnum } from '~modules/measurement/enum/measurement-type.enum';
import {
  MeasurementFixture,
  MeasurementFixtureInterface
} from '~modules/measurement/measurement.fixture';
import { initPipes } from '~utils/app.utils';

describe('MeasurementController (e2e)', () => {
  let app: INestApplication;
  let fixture: MeasurementFixtureInterface;
  let displayAuth: DisplayAuthInterface;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    initPipes(app);

    await app.init();
    fixture = await MeasurementFixture(app);
    displayAuth = await fixture.displayAuth();
  });

  it('/measurements (GET)', async () => {
    const resp = await request(app.getHttpServer())
      .get('/measurements')
      .expect(400);
  });

  it('/measurements/display (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/measurements/display')
      .set({ authorization: `${displayAuth.accessToken}` })
      .expect(200);

    expect(response.body[fixture.sensorOne.id]).toBeDefined();
    expect(response.body[fixture.sensorOne.id].measurements).toBeDefined();
    expect(response.body[fixture.sensorOne.id].measurements[MeasurementTypeEnum.GAS]).toBeDefined();
  });


  afterAll(async () => {
    await app.close();
  });
});
