import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { QueryPaginationDto } from 'src/common/queryPagination.dto';

export class QueryFriendDto extends QueryPaginationDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'The keyword to search for',
    example: 'John',
  })
  keyword: string;
}
