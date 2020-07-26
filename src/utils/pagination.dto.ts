import {
  Pagination,
  IPaginationMeta,
  IPaginationLinks,
} from 'nestjs-typeorm-paginate';

export class PaginationDto<T> extends Pagination<T> {
  public readonly items: T[];
  readonly meta: IPaginationMeta;
  readonly links: IPaginationLinks;

  public static fromPagination<BaseType, DtoType>(
    list: Pagination<BaseType>,
    converter: (from: BaseType) => DtoType,
  ): PaginationDto<DtoType> {
    return {
      items: list.items.map((x) => converter(x)),
      meta: list.meta,
      links: list.links,
    };
  }
}
