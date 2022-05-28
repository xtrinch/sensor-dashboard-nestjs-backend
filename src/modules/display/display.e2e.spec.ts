import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import {
  DisplayFixture,
  DisplayFixtureInterface,
} from '~modules/display/display.fixture';
import { MeasurementTypeEnum } from '~modules/measurement/enum/measurement-type.enum';
import { UserAuthInterface } from '~modules/user/user.interfaces';
import { initPipes } from '~utils/app.utils';
import { createTestingApp } from '~utils/test-utils';
import { DisplayAuthInterface } from './display.interfaces';

describe('DisplayController (e2e)', () => {
  let app: INestApplication;
  let fixture: DisplayFixtureInterface;
  let userAuth: UserAuthInterface;
  let displayAuth: DisplayAuthInterface;

  beforeAll(async () => {
    app = await createTestingApp();

    initPipes(app);
    await app.init();
    fixture = await DisplayFixture(app);
    userAuth = await fixture.userAuth();
    displayAuth = await fixture.displayAuth();
  });

  it('/displays (POST)', () => {
    return request(app.getHttpServer())
      .post('/displays')
      .set({ authorization: userAuth.user.id })
      .send({
        name: 'Test display',
        displayName: 'Test display',
        location: 'Living room',
        measurementTypes: [MeasurementTypeEnum.GAS],
        sensorIds: [fixture.sensorOne.id],
      })
      .expect(201);
  });

  it('/displays (GET)', () => {
    return request(app.getHttpServer()).get('/displays').expect(200);
  });

  it('/displays/my (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/displays/my')
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
