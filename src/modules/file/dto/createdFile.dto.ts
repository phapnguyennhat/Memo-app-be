import { ApiProperty } from '@nestjs/swagger';

export class CreatedFileDto {
  @ApiProperty({
    description: 'The url of the file',
    example: 'https://example.com/file.png',
  })
  url: string;

  @ApiProperty({
    description: 'The name of the file',
    example: 'file.png',
  })
  name: string;

  @ApiProperty({
    description: 'The key of the file',
    example: 'file.png',
  })
  key: string;

  @ApiProperty({
    description: 'The format of the file',
    example: 'image',
  })
  format: string;
}
