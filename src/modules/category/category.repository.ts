import { Pagination } from 'nestjs-typeorm-paginate';
import { EntityRepository, Repository } from 'typeorm';
import {
  Category,
  CategoryWhereInterface,
} from '~modules/category/category.entity';
import { PaginationQueryDto } from '~utils/pagination.query.dto';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  public async findAll(
    where: CategoryWhereInterface,
    options: { relations?: string[] },
    pagination: PaginationQueryDto,
  ): Promise<Pagination<Category>> {
    const { page, limit } = pagination;

    const query = this.createQueryBuilder('category')
      .where(where)
      .skip(page * limit || 0)
      .take(limit || 1000)
      .loadRelationCountAndMap('category.numTopics', 'category.topics')
      .orderBy('category.createdAt', 'DESC');

    const [items, totalItems] = await query.getManyAndCount();

    return {
      items,
      meta: {
        totalItems: totalItems,
        itemCount: totalItems,
        itemsPerPage: limit,
        totalPages: totalItems / limit,
        currentPage: page,
      },
    };
  }
}
