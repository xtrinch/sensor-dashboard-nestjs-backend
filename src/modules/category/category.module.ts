import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from '~/modules/category/category.service';
import { CategoryController } from '~modules/category/category.controller';
import { Category } from '~modules/category/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoryService],
  exports: [CategoryService, TypeOrmModule],
  controllers: [CategoryController],
})
export class CategoryModule {}
