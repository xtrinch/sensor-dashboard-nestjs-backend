import { INestApplication } from '@nestjs/common';
import { NestApplicationContext } from '@nestjs/core';
import { plainToClass } from 'class-transformer';
import { Category } from '~modules/category/category.entity';
import { CategoryService } from '~modules/category/category.service';
import { CategoryCreateDto } from '~modules/category/dto/category.create.dto';
import { MeasurementTypeEnum } from '~modules/measurement/enum/measurement-type.enum';
import { BoardTypeEnum } from '~utils/board-types.enum';

export interface CategoryFixtureInterface {
  categoryOne: Category;
}

export async function CategoryFixture(
  module: NestApplicationContext | INestApplication,
  dedupe: any | CategoryFixtureInterface = {},
): Promise<CategoryFixtureInterface> {
  if (dedupe.categoryOne) return dedupe;
  const categoryService = await module.get<CategoryService>(CategoryService);

  const categoryOne = await categoryService.create(
    plainToClass(CategoryCreateDto, {
      name: 'Test category',
      location: 'Living room',
      boardType: BoardTypeEnum.NODEMCU_ESP8266,
      measurementTypes: Object.values(MeasurementTypeEnum),
    }),
  );

  return { categoryOne };
}
