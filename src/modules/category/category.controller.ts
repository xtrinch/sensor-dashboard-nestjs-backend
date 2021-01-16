import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Category, CategoryId } from '~/modules/category/category.entity';
import { CategoryService } from '~/modules/category/category.service';
import { CategoryCreateDto } from '~modules/category/dto/category.create.dto';
import { CategoryDto } from '~modules/category/dto/category.dto';
import { CategoryUpdateDto } from '~modules/category/dto/category.update.dto';
import { JwtGuard, UserRequest } from '~modules/user/jwt.guard';
import { PaginationDto } from '~utils/pagination.dto';
import { PaginationQueryDto } from '~utils/pagination.query.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  public async findAll(
    @Query() pagination: PaginationQueryDto,
  ): Promise<PaginationDto<CategoryDto>> {
    const items = await this.categoryService.findAll({}, {}, pagination);

    return PaginationDto.fromPagination<Category, CategoryDto>(
      items,
      CategoryDto.fromCategory,
    );
  }

  @UseGuards(JwtGuard)
  @Post()
  public async create(
    @Body() data: CategoryCreateDto,
    @Request() request: UserRequest,
  ): Promise<CategoryDto> {
    const category = await this.categoryService.create(request, data);
    return CategoryDto.fromCategory(category);
  }

  @UseGuards(JwtGuard)
  @Put('/:id')
  public async update(
    @Body() data: CategoryUpdateDto,
    @Param('id') id: CategoryId,
    @Request() request: UserRequest,
  ): Promise<CategoryDto> {
    const category = await this.categoryService.update(request, id, data);
    return CategoryDto.fromCategory(category);
  }

  @UseGuards(JwtGuard)
  @Get('/:id')
  public async get(
    @Param('id') id: CategoryId,
    @Request() request: UserRequest,
  ): Promise<CategoryDto> {
    const category = await this.categoryService.find({ id });

    return CategoryDto.fromCategory(category);
  }

  @UseGuards(JwtGuard)
  @Delete('/:id')
  public async delete(
    @Param('id') id: CategoryId,
    @Request() request: UserRequest,
  ): Promise<{ status: string }> {
    await this.categoryService.delete(request, { id });

    return {
      status: '200',
    };
  }
}
