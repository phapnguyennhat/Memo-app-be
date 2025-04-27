import { IsOptional } from 'class-validator';
import { IsEnum } from 'class-validator';
import { QueryPaginationDto } from 'src/common/queryPagination.dto';
import { SortOrder } from 'src/enum/sortOrder.enum';

export class QueryPostDto extends QueryPaginationDto {
  @IsEnum(SortOrder)
  @IsOptional()
  sortOrder: SortOrder = SortOrder.DESC;
}
