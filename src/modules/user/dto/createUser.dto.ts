import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The username of the user',
    example: 'John Doe',
  })
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'The email of the user',
    example: 'john.doe@example.com',
  })
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  @ApiProperty({
    description: 'The phone number of the user',
    example: '+84909090909',
  })
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The password of the user',
    example: 'password',
  })
  password: string;
}
