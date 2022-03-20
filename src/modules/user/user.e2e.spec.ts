import { INestApplication } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import * as request from 'supertest';
import { UserUpdateDto } from '~modules/user/dto/user.update.dto';
import { GroupEnum } from '~modules/user/enum/group.enum';
import { UserFixture, UserFixtureInterface } from '~modules/user/user.fixture';
import { UserAuthInterface } from '~modules/user/user.interfaces';
import { initPipes } from '~utils/app.utils';
import { createTestingApp } from '~utils/test-utils';

describe('SensorController (e2e)', () => {
  let app: INestApplication;
  let fixture: UserFixtureInterface;
  let userAuth: UserAuthInterface;

  beforeAll(async () => {
    app = await createTestingApp();

    initPipes(app);
    await app.init();
    fixture = await UserFixture(app);
    userAuth = await fixture.userAuth();
  });

  it('/users (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/users')
      .expect(200);
    expect(response.body.items.length).toEqual(1);
    expect(response.body.items[0].name).toEqual(fixture.userOne.name);
  });

  it('/users/:id (PUT)', async () => {
    const response = await request(app.getHttpServer())
      .put(`/users/${fixture.userOne.id}`)
      .set({ authorization: userAuth.user.id })
      .send(plainToClass(UserUpdateDto, { group: GroupEnum.ADMIN }))
      .expect(200);

    expect(response.body.group).toEqual(GroupEnum.ADMIN);
  });

  it('/users/:id (DELETE)', async () => {
    await request(app.getHttpServer())
      .delete(`/users/${fixture.userOne.id}`)
      .set({ authorization: userAuth.user.id })
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
