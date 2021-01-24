import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from '~/modules/category/category.service';
import { CategoryController } from '~modules/category/category.controller';
import { Category } from '~modules/category/category.entity';
import { CategoryRepository } from '~modules/category/category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Category, CategoryRepository])],
  providers: [CategoryService],
  exports: [CategoryService, TypeOrmModule],
  controllers: [CategoryController],
})
export class CategoryModule {}
