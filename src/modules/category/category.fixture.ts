import { INestApplication } from '@nestjs/common';
import { NestApplicationContext } from '@nestjs/core';
import { plainToClass } from 'class-transformer';
import { Category } from '~modules/category/category.entity';
import { CategoryService } from '~modules/category/category.service';
import { CategoryCreateDto } from '~modules/category/dto/category.create.dto';
import { MeasurementTypeEnum } from '~modules/measurement/enum/measurement-type.enum';
import { UserFixture, UserFixtureInterface } from '~modules/user/user.fixture';
import { BoardTypeEnum } from '~utils/board-types.enum';

export interface CategoryFixtureInterface extends UserFixtureInterface {
  categoryOne: Category;
}

export async function CategoryFixture(
  module: NestApplicationContext | INestApplication,
  dedupe: any | CategoryFixtureInterface = {},
): Promise<CategoryFixtureInterface> {
  if (dedupe.categoryOne) return dedupe;
  const fixture = await UserFixture(module, dedupe);
  const categoryService = await module.get<CategoryService>(CategoryService);

  const categoryOne = await categoryService.create(
    fixture.userRequest,
    plainToClass(CategoryCreateDto, {
      name: 'Test category',
      location: 'Living room',
      boardType: BoardTypeEnum.NODEMCU_ESP8266,
      measurementTypes: Object.values(MeasurementTypeEnum),
    }),
  );

  return { ...fixture, categoryOne };
}
