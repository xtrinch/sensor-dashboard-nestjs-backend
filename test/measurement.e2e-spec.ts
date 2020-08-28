import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '~app.module';
import {
  MeasurementFixture,
  MeasurementFixtureInterface,
} from '~modules/measurement/measurement.fixture';
import { initPipes } from '~utils/app.utils';

describe('MeasurementController (e2e)', () => {
  let app: INestApplication;
  let fixture: MeasurementFixtureInterface;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    initPipes(app);

    await app.init();
    fixture = await MeasurementFixture(app);
  });

  it('/measurements (GET)', async () => {
    const resp = await request(app.getHttpServer())
      .get('/measurements')
      .expect(400);
  });

  afterAll(async () => {
    await app.close();
  });
});
