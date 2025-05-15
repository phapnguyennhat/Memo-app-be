import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Validate,
} from 'class-validator';
import { EmailOrPhoneRequiredConstraint } from 'src/decorator/EmailOrPhoneRequiredConstraint';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The username of the user',
    example: 'John Doe',
  })
  username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
    required: true,
  })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The last name of the user',
    example: 'Doe',
    required: true,
  })
  lastName: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({
    description: 'The email of the user',
    example: 'john.doe@example.com',
    required: false,
  })
  email: string;

  @IsOptional()
  @IsPhoneNumber()
  @ApiProperty({
    description: 'The phone number of the user',
    example: '+84909090900',
    required: false,
  })
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: true,
    description: 'The password of the user',
    example: 'password',
  })
  password: string;

  @Validate(EmailOrPhoneRequiredConstraint)
  dummyFieldForValidation: string;
}
