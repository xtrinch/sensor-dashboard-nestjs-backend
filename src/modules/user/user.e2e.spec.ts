import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';
import * as request from 'supertest';
import { AppModule } from '~app.module';
import { UserUpdateDto } from '~modules/user/dto/user.update.dto';
import { GroupEnum } from '~modules/user/enum/group.enum';
import { UserFixture, UserFixtureInterface } from '~modules/user/user.fixture';
import { UserAuthInterface } from '~modules/user/user.interfaces';
import { initPipes } from '~utils/app.utils';

describe('SensorController (e2e)', () => {
  let app: INestApplication;
  let fixture: UserFixtureInterface;
  let userAuth: UserAuthInterface;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
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
      .set({ authorization: `Bearer ${userAuth.accessToken}` })
      .send(plainToClass(UserUpdateDto, { group: GroupEnum.ADMIN }))
      .expect(200);
      
    expect(response.body.group).toEqual(GroupEnum.ADMIN);
  });

  it('/users/:id (DELETE)', async () => {
    await request(app.getHttpServer())
      .delete(`/users/${fixture.userOne.id}`)
      .set({ authorization: `Bearer ${userAuth.accessToken}` })
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
