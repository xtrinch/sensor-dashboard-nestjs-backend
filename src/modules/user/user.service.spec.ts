import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { v4 } from 'uuid';
import { UserCreateDto } from '~modules/user/dto/user.create.dto';
import { UserUpdateDto } from '~modules/user/dto/user.update.dto';
import { GroupEnum } from '~modules/user/enum/group.enum';
import { User } from '~modules/user/user.entity';
import { UserFixture, UserFixtureInterface } from '~modules/user/user.fixture';
import { UserModule } from '~modules/user/user.module';
import { UserService } from '~modules/user/user.service';

describe('UserService', () => {
  let userService: UserService;
  let module: TestingModule = null;
  let fixture: UserFixtureInterface;

  beforeAll(async () => {
    const seed = v4();

    module = await Test.createTestingModule({
      providers: [UserService, UserService],
      imports: [
        UserModule,
        TypeOrmModule.forRoot(),
        TypeOrmModule.forFeature([User]),
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    fixture = await UserFixture(module, { seed });
  }, 20000);

  it('should create a user', async () => {
    const username = `${v4()}username123`;
    const email = `${v4()}email@email.com`;
    const data = plainToClass(UserCreateDto, {
      username,
      email,
      name: 'Mojca',
      surname: 'Rojca',
      password: 'test pass',
    });

    await validateOrReject(data);
    const user = await userService.create(data);
    expect(user).toBeDefined();
    expect(user.username).toEqual(username);
    expect(user.email).toEqual(email);
  });

  it('update a user', async () => {
    const user = await userService.update(fixture.userOne.id, plainToClass(UserUpdateDto, { group: GroupEnum.MODERATOR }));
    expect(user.group).toEqual(GroupEnum.MODERATOR);
  });

  afterAll(async () => {
    await module.close();
  });
});
