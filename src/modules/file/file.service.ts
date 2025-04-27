import { Injectable, NotFoundException } from '@nestjs/common';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { InjectRepository } from '@nestjs/typeorm';
import { File, FileFormat } from 'src/database/entity/file.entity';
import { Repository } from 'typeorm';
import { CreateFileDto } from './dto/createFile.dto';

@Injectable()
export class FileService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    @InjectRepository(File) private readonly fileRepo: Repository<File>,
  ) {}

  async create(data: CreateFileDto) {
    const file = this.fileRepo.create(data);
    await this.fileRepo.save(file);
    return file;
  }

  async findById(id: string) {
    const file = await this.fileRepo.findOneBy({ id });
    if (!file) {
      throw new NotFoundException('File not found');
    }
    return file;
  }

  async deleteFile(file: File) {
    await this.cloudinaryService.deleteFile(file.key);
    await this.fileRepo.remove(file);
  }

  getFileFormat(file: Express.Multer.File): FileFormat {
    const format = file.mimetype.split('/')[1];
    if (format === 'video') {
      return FileFormat.VIDEO;
    }
    return FileFormat.IMAGE;
  }
}
