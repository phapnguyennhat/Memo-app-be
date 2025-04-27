import { ApiProperty } from '@nestjs/swagger';
import { CreatedFileDto } from 'src/modules/file/dto/createdFile.dto';

export class RegisterResponse {
  @ApiProperty({
    description: 'The username of the user',
    example: 'John Doe',
  })
  username: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'john.doe@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'The phone number of the user',
    example: '1234567890',
  })
  phoneNumber: string;

  @ApiProperty({
    description: 'The avatar of the user',
    type: CreatedFileDto,
  })
  avatar: CreatedFileDto;

  @ApiProperty({
    description: 'The avatar id of the user',
    example: '1234567890',
  })
  avatarId: string;
}
