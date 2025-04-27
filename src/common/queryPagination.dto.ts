import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

import { IsNumber } from 'class-validator';

export class QueryPaginationDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page: number = 1;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit: number = 10;
}
