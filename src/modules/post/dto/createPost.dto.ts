import { IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsOptional()
  @IsString()
  title: string;
}

export class PostDataDto extends CreatePostDto {
  ownerId: string;
  fileAttachId: string;
}
