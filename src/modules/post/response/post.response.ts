import { ApiProperty } from '@nestjs/swagger';
import { FileResponse } from 'src/modules/file/response/file.response';

export class PostResponse {
  @ApiProperty({
    description: 'The id of the post',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'The title of the post',
    example: 'My first post',
  })
  title: string;

  @ApiProperty({
    description: 'The createdAt of the post',
    example: '2021-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The updatedAt of the post',
    example: '2021-01-01T00:00:00.000Z',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'The fileAttach of the post',
    type: FileResponse,
  })
  fileAttach: FileResponse;
}
