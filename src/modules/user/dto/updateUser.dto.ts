import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The password of the user',
    example: 'password',
  })
  password?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The email of the user',
    example: 'example@gmail.com',
  })
  email?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The phone number of the user',
    example: '0909090909',
  })
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
  })
  firstName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The last name of the user',
    example: 'Doe',
  })
  lastName?: string;

  avatarId: string;
}
