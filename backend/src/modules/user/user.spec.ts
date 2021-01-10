import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { v4 } from 'uuid';
import { AuthService } from '~modules/user/auth.service';
import { UserCreateDto } from '~modules/user/dto/user.create.dto';
import { User } from '~modules/user/user.entity';
import { UserFixture, UserFixtureInterface } from '~modules/user/user.fixture';
import { UserModule } from '~modules/user/user.module';
import { UserService } from '~modules/user/user.service';

describe('UserService', () => {
  let userService: UserService;
  let authService: AuthService;
  let module: TestingModule = null;
  let fixture: UserFixtureInterface;

  beforeAll(async () => {
    const seed = v4();

    module = await Test.createTestingModule({
      providers: [UserService, AuthService],
      imports: [
        UserModule,
        TypeOrmModule.forRoot(),
        TypeOrmModule.forFeature([User]),
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    authService = module.get<AuthService>(AuthService);
    fixture = await UserFixture(module, { seed });
  }, 20000);

  it('should register a user', async () => {
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
    const user = await authService.register(data);
    expect(user).toBeDefined();
    expect(user.username).toEqual(username);
    expect(user.email).toEqual(email);
  });

  it('should login a user', async () => {
    const { accessToken } = await authService.login(fixture.userOne);
    expect(accessToken).toBeDefined();
  });

  afterAll(async () => {
    await module.close();
  });
});
