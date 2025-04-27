import { ApiProperty } from '@nestjs/swagger';
import { FileResponse } from 'src/modules/file/response/file.response';

export class UserResponse {
  @ApiProperty({
    description: 'The id of the user',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'The username of the user',
  })
  username: string;

  @ApiProperty({
    description: 'The email of the user',
  })
  email: string;

  @ApiProperty({
    description: 'The phone number of the user',
  })
  phoneNumber: string;

  @ApiProperty({
    description: 'The avatar of the user',
    type: FileResponse,
  })
  avatar: FileResponse;

  @ApiProperty({
    description: 'The avatar id of the user',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  avatarId: string;
}
