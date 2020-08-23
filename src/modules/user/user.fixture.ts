import { INestApplication } from '@nestjs/common';
import { NestApplicationContext } from '@nestjs/core';
import { plainToClass } from 'class-transformer';
import { v4 } from 'uuid';
import { UserCreateDto } from '~modules/user/dto/user.create.dto';
import { User } from '~modules/user/user.entity';
import { UserRequest } from '~modules/user/user.guard';
import { UserService } from '~modules/user/user.service';

export interface UserFixtureInterface {
  userOne: User;
  userRequest: UserRequest;
}

export async function UserFixture(
  module: NestApplicationContext | INestApplication,
  deduplicate: any | UserFixtureInterface = {},
): Promise<UserFixtureInterface> {
  if (deduplicate.userOne) return deduplicate;
  const userService = await module.get<UserService>(UserService);

  const username = `${v4()}username123`;
  const email = `${v4()}email@email.com`;

  const userOne = await userService.create(
    plainToClass(UserCreateDto, {
      username,
      email,
      name: 'Mojca',
      surname: 'Rojca',
      password: 'Test password',
    }),
  );

  const userRequest = {
    user: userOne,
  } as UserRequest;

  return { userOne, userRequest };
}
