import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';

export class PaginationQueryDto implements IPaginationOptions {
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  limit: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page: number;

  @IsString()
  @IsOptional()
  orderBy?: string;

  @IsString()
  @IsOptional()
  orderDir?: 'ASC' | 'DESC';

  route?: string;
}
