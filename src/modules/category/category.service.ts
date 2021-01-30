import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from 'nestjs-typeorm-paginate';
import { CategoryRepository } from '~modules/category/category.repository';
import { CategoryCreateDto } from '~modules/category/dto/category.create.dto';
import { CategoryUpdateDto } from '~modules/category/dto/category.update.dto';
import { PaginationQueryDto } from '~utils/pagination.query.dto';
import {
  Category,
  CategoryId,
  CategoryWhereInterface
} from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository,
  ) {}

  public async findAll(
    where: CategoryWhereInterface,
    options: { relations?: string[] },
    pagination: PaginationQueryDto,
  ): Promise<Pagination<Category>> {
    return this.categoryRepository.findAll(where, options, pagination);
  }

  public async find(
    where: CategoryWhereInterface,
    options?: { relations: string[] },
  ): Promise<Category> {
    const category = await this.categoryRepository.findOne(where, options);

    if (!category) {
      throw new NotFoundException();
    }

    return category;
  }

  public async create(data: CategoryCreateDto): Promise<Category> {
    const category = new Category();
    category.name = data.name;
    category.description = data.description;
    category.protected = data.protected;
    category.sequenceNo = (await this.categoryRepository.getLastSequenceNo()) + 1;

    await Category.save(category);

    return category;
  }

  public async update(
    id: CategoryId,
    data: CategoryUpdateDto,
  ): Promise<Category> {
    const category = await this.categoryRepository.findOneOrFail({ id });

    category.name = data.name;
    category.description = data.description;
    category.protected = data.protected;

    await Category.save(category);

    return category;
  }

  public async increaseInSequence(id: CategoryId): Promise<Category> {
    const category = await this.categoryRepository.findOneOrFail({ id });
    const categoryAboveIt = await this.categoryRepository.findOne({
      sequenceNo: category.sequenceNo + 1,
    });

    if (!categoryAboveIt) {
      throw new BadRequestException('There is no category below it.');
    }

    category.sequenceNo += 1;

    if (categoryAboveIt.sequenceNo > 0) {
      categoryAboveIt.sequenceNo -= 1;
    }

    await Category.save(categoryAboveIt);
    await Category.save(category);

    return category;
  }

  public async decreaseInSequence(id: CategoryId): Promise<Category> {
    const category = await this.categoryRepository.findOne({ id });
    if (category.sequenceNo === 0) {
      throw new BadRequestException('Category is already the first.');
    }

    const categoryBelowIt = await this.categoryRepository.findOneOrFail({
      sequenceNo: category.sequenceNo - 1,
    });
    if (!categoryBelowIt) {
      throw new BadRequestException('There is no category above it.');
    }
    categoryBelowIt.sequenceNo += 1;
    category.sequenceNo -= 1;

    await Category.save(categoryBelowIt);
    await Category.save(category);

    return category;
  }

  public async delete(where: CategoryWhereInterface): Promise<boolean> {
    const category = await this.find(where);
    await Category.remove(category);

    await this.categoryRepository.reSequenceNumbersAbove(category.sequenceNo);

    return true;
  }
}
