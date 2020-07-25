import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';

export class PaginationQueryDto implements IPaginationOptions {
  /**
   * the amount of items to be requested per page
   */
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  limit: number;
  /**
   * the page that is requested
   */

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
