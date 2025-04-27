import { IsNotEmpty, IsString } from 'class-validator';
import { FileFormat } from 'src/database/entity/file.entity';
export class CreateFileDto {
  @IsNotEmpty()
  @IsString()
  key: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  url: string;

  @IsNotEmpty()
  @IsString()
  format: FileFormat;
}
