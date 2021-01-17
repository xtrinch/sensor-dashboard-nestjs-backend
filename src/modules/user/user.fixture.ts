import { INestApplication } from '@nestjs/common';
import { NestApplicationContext } from '@nestjs/core';
import { plainToClass } from 'class-transformer';
import { v4 } from 'uuid';
import { AuthService } from '~modules/user/auth.service';
import { UserCreateDto } from '~modules/user/dto/user.create.dto';
import { UserUpdateDto } from '~modules/user/dto/user.update.dto';
import { GroupEnum } from '~modules/user/enum/group.enum';
import { UserRequest } from '~modules/user/jwt.guard';
import { User } from '~modules/user/user.entity';
import { UserAuthInterface } from '~modules/user/user.interfaces';
import { UserService } from '~modules/user/user.service';

export interface UserFixtureInterface {
  userOne: User;
  userRequest: UserRequest;
  userAuth: () => Promise<UserAuthInterface>;
}

export async function UserFixture(
  module: NestApplicationContext | INestApplication,
  dedupe: any | UserFixtureInterface = {},
): Promise<UserFixtureInterface> {
  if (dedupe.userOne) return dedupe;
  const userService = await module.get<UserService>(UserService);
  const username = `${v4()}username123`;
  const email = `${v4()}email@email.com`;
  const password = 'Test password';

  let userOne = await userService.create(
    plainToClass(UserCreateDto, {
      username,
      email,
      password,
      name: 'Mojca',
      surname: 'Rojca',
    }),
  );

  userOne = await userService.update(userOne.id, plainToClass(UserUpdateDto, { group: GroupEnum.ADMIN }))

  const userAuth = async () => {
    const authService = await module.get<AuthService>(AuthService);
    return authService.login(userOne);
  };

  const userRequest = {
    user: userOne,
  } as UserRequest;

  return { userOne, userAuth, userRequest };
}
