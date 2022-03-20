import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { DisplayAuthInterface } from '~modules/display/display.interfaces';
import { MeasurementTypeEnum } from '~modules/measurement/enum/measurement-type.enum';
import {
  MeasurementFixture,
  MeasurementFixtureInterface,
} from '~modules/measurement/measurement.fixture';
import { initPipes } from '~utils/app.utils';
import { createTestingApp } from '~utils/test-utils';

describe('MeasurementController (e2e)', () => {
  let app: INestApplication;
  let fixture: MeasurementFixtureInterface;
  let displayAuth: DisplayAuthInterface;

  beforeAll(async () => {
    app = await createTestingApp();

    initPipes(app);

    await app.init();
    fixture = await MeasurementFixture(app);
    displayAuth = await fixture.displayAuth();
  });

  it('/measurements (GET)', async () => {
    await request(app.getHttpServer()).get('/measurements').expect(400);
  });

  it('/measurements/display (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/measurements/display')
      .set({ authorization: `${displayAuth.accessToken}` })
      .expect(200);

    expect(response.body[fixture.sensorOne.id]).toBeDefined();
    expect(response.body[fixture.sensorOne.id].measurements).toBeDefined();
    expect(
      response.body[fixture.sensorOne.id].measurements[MeasurementTypeEnum.GAS],
    ).toBeDefined();
  });

  afterAll(async () => {
    await app.close();
  });
});
