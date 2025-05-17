import { IsOptional, IsString } from 'class-validator';
import { QueryPaginationDto } from 'src/common/queryPagination.dto';

export class QueryFriendDto extends QueryPaginationDto {
  @IsString()
  @IsOptional()
  keyword: string;
}
