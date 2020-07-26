import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';

export class PaginationQueryDto implements IPaginationOptions {
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  limit: number;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  page: number;

  /**
   * a babasesic route for generating links (i.e., WITHOUT query params)
   */
  route?: string;
}
