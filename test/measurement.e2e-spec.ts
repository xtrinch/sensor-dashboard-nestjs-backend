import { Test, TestingModule } from '@nestjs/testing';
import {
  INestApplication,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import * as request from 'supertest';
import {
  MeasurementFixtureInterface,
  MeasurementFixture,
} from '~modules/measurement/measurement.fixture';
import { AppModule } from '~app.module';
import { ValidationError } from 'class-validator';
import { initPipes } from '~utils/app.utils';

describe('MeasurementController (e2e)', () => {
  let app: INestApplication;
  let fixture: MeasurementFixtureInterface;

  beforeEach(async () => {
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
