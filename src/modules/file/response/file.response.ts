import { ApiProperty } from '@nestjs/swagger';

export class FileResponse {
  @ApiProperty({
    description: 'The id of the file',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'The url of the file',
    example: 'https://example.com/file.jpg',
  })
  url: string;

  @ApiProperty({
    description: 'The name of the file',
    example: 'file.jpg',
  })
  name: string;

  @ApiProperty({
    description: 'The format of the file',
    example: 'image',
  })
  format: string;

  @ApiProperty({
    description: 'The key of the file',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  key: string;
}
