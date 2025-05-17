import { IsOptional, IsString } from 'class-validator';

import { QueryPaginationDto } from 'src/common/queryPagination.dto';

export class QueryUserDto extends QueryPaginationDto {
  @IsString()
  @IsOptional()
  keyword: string;
}
