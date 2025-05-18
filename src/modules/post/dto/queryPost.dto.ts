import { IsOptional } from 'class-validator';
import { IsEnum } from 'class-validator';
import { QueryPaginationDto } from 'src/common/queryPagination.dto';
import { SortOrder } from 'src/enum/sortOrder.enum';
import { ApiProperty } from '@nestjs/swagger';
export class QueryPostDto extends QueryPaginationDto {
  @IsEnum(SortOrder)
  @IsOptional()
  @ApiProperty({
    description: 'Sắp xếp thứ tự ngày tạo bài viết',
    example: SortOrder.DESC,
    required: false,
    enum: SortOrder,
  })
  sortOrder: SortOrder = SortOrder.DESC;
}
