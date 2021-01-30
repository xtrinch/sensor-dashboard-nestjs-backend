import { INestApplication } from '@nestjs/common';
import { NestApplicationContext } from '@nestjs/core';
import { plainToClass } from 'class-transformer';
import { Category } from '~modules/category/category.entity';
import { CategoryService } from '~modules/category/category.service';
import { CategoryCreateDto } from '~modules/category/dto/category.create.dto';
import { UserFixture, UserFixtureInterface } from '~modules/user/user.fixture';

export interface CategoryFixtureInterface extends UserFixtureInterface {
  categoryOne: Category;
  categoryTwo: Category;
}

export async function CategoryFixture(
  module: NestApplicationContext | INestApplication,
  dedupe: any | CategoryFixtureInterface = {},
): Promise<CategoryFixtureInterface> {
  if (dedupe.categoryOne) return dedupe;
  const fixture = await UserFixture(module, dedupe);

  const categoryService = await module.get<CategoryService>(CategoryService);

  const categoryOne = await categoryService.create(
    plainToClass(CategoryCreateDto, {
      name: 'Test category',
      protected: false,
    }),
  );

  const categoryTwo = await categoryService.create(
    plainToClass(CategoryCreateDto, {
      name: 'Test category1',
      protected: false,
    }),
  );

  return { ...fixture, categoryOne, categoryTwo };
}
