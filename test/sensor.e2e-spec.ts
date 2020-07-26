import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import {
  SensorFixtureInterface,
  SensorFixture,
} from '~modules/sensor/sensor.fixture';
import { AppModule } from '~app.module';

describe('SensorController (e2e)', () => {
  let app: INestApplication;
  let fixture: SensorFixtureInterface;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
    fixture = await SensorFixture(app);
  });

  it('/sensors (GET)', () => {
    return request(app.getHttpServer()).get('/sensors').expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
