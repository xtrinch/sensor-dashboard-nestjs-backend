import { Pagination } from 'nestjs-typeorm-paginate';
import { EntityRepository, Repository } from 'typeorm';
import { Topic, TopicWhereInterface } from '~modules/topic/topic.entity';
import { PaginationQueryDto } from '~utils/pagination.query.dto';

@EntityRepository(Topic)
export class TopicRepository extends Repository<Topic> {
  public async findAll(
    where: TopicWhereInterface,
    options: { relations?: string[] },
    pagination: PaginationQueryDto,
  ): Promise<Pagination<Topic>> {
    const { page, limit } = pagination;

    let query = this.createQueryBuilder('topic')
      .where(where)
      .skip((page - 1) * limit || 0)
      .take(limit || 1000)
      .loadRelationCountAndMap('topic.numComments', 'topic.comments')
      .orderBy(
        `topic.${pagination.orderBy || 'createdAt'}`,
        pagination.orderDir || 'DESC',
      );

    for (const relation of options?.relations || []) {
      if (relation.split('.').length > 1) {
        query = query.leftJoinAndSelect(
          relation,
          relation.split('.').join('_'),
        );
      } else {
        query = query.leftJoinAndSelect(`topic.${relation}`, relation);
      }
    }

    const [items, totalItems] = await query.getManyAndCount();
    return {
      items,
      meta: {
        totalItems: totalItems,
        itemCount: totalItems,
        itemsPerPage: limit,
        totalPages: totalItems / limit || 1,
        currentPage: page,
      },
    };
  }
}
