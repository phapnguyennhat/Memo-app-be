import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

import { IsNumber } from 'class-validator';

export class QueryPaginationDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({
    description: 'The page number',
    example: 1,
  })
  page: number = 1;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({
    description: 'The limit number',
    example: 10,
  })
  limit: number = 10;
}
