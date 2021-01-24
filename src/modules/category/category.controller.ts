import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request
} from '@nestjs/common';
import { Category, CategoryId } from '~/modules/category/category.entity';
import { CategoryService } from '~/modules/category/category.service';
import { CategoryCreateDto } from '~modules/category/dto/category.create.dto';
import { CategoryDto } from '~modules/category/dto/category.dto';
import { CategoryUpdateDto } from '~modules/category/dto/category.update.dto';
import AuthGuard from '~modules/user/auth.decorator';
import { PermissionsEnum } from '~modules/user/enum/permissions.enum';
import { UserRequest } from '~modules/user/jwt.guard';
import { PaginationDto } from '~utils/pagination.dto';
import { PaginationQueryDto } from '~utils/pagination.query.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  public async findAll(
    @Query() pagination: PaginationQueryDto,
  ): Promise<PaginationDto<CategoryDto>> {
    const items = await this.categoryService.findAll(
      {}, 
      { relations: ['lastComment', 'lastComment.user', 'lastTopic', 'lastTopic.user'] }, 
      pagination
    );

    return PaginationDto.fromPagination<Category, CategoryDto>(
      items,
      CategoryDto.fromCategory,
    );
  }

  @AuthGuard({
    permissions: [PermissionsEnum.Category__create],
  })
  @Post()
  public async create(
    @Body() data: CategoryCreateDto,
    @Request() request: UserRequest,
  ): Promise<CategoryDto> {
    const category = await this.categoryService.create(data);
    return CategoryDto.fromCategory(category);
  }

  @Get('/:id')
  public async getCategory(@Param('id') id: CategoryId): Promise<CategoryDto> {
    const category = await this.categoryService.find({ id });
    return CategoryDto.fromCategory(category);
  }

  @AuthGuard({
    permissions: [PermissionsEnum.Category__update],
  })
  @Put('/:id')
  public async update(
    @Body() data: CategoryUpdateDto,
    @Param('id') id: CategoryId,
    @Request() request: UserRequest,
  ): Promise<CategoryDto> {
    const category = await this.categoryService.update(id, data);
    return CategoryDto.fromCategory(category);
  }

  @AuthGuard()
  @Get('/:id')
  public async get(
    @Param('id') id: CategoryId,
    @Request() request: UserRequest,
  ): Promise<CategoryDto> {
    const category = await this.categoryService.find({ id });

    return CategoryDto.fromCategory(category);
  }

  @AuthGuard({
    permissions: [PermissionsEnum.Category__delete],
  })
  @Delete('/:id')
  public async delete(
    @Param('id') id: CategoryId,
    @Request() request: UserRequest,
  ): Promise<{ status: string }> {
    await this.categoryService.delete({ id });

    return {
      status: '200',
    };
  }
}
