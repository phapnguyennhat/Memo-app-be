import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from 'src/database/entity/file.entity';

@Module({
  imports: [CloudinaryModule, TypeOrmModule.forFeature([File])],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
