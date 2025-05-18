import { IsOptional, IsString } from 'class-validator';

import { QueryPaginationDto } from 'src/common/queryPagination.dto';
import { ApiProperty } from '@nestjs/swagger';
export class QueryUserDto extends QueryPaginationDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'The keyword to search for',
    example: 'John',
  })
  keyword: string;
}
