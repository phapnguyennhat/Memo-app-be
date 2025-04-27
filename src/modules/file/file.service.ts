import { Injectable, NotFoundException } from '@nestjs/common';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { InjectRepository } from '@nestjs/typeorm';
import { File, FileFormat } from 'src/database/entity/file.entity';
import { QueryRunner, Repository } from 'typeorm';

@Injectable()
export class FileService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    @InjectRepository(File) private readonly fileRepo: Repository<File>,
  ) {}

  async create(
    file: Express.Multer.File,
    folder: string,
    queryRunner?: QueryRunner,
  ) {
    const responseUpload = await this.cloudinaryService.uploadFile(
      file,
      folder,
    );

    if (queryRunner) {
      return queryRunner.manager.create(File, {
        key: responseUpload.key,
        url: responseUpload.url,
        format: this.getFileFormat(file),
        name: file.originalname,
      });
    }

    const fileEntity = this.fileRepo.create({
      key: responseUpload.key,
      url: responseUpload.url,
      format: this.getFileFormat(file),
      name: file.originalname,
    });
    return this.fileRepo.save(fileEntity);
  }

  async findById(id: string) {
    const file = await this.fileRepo.findOneBy({ id });
    if (!file) {
      throw new NotFoundException('File not found');
    }
    return file;
  }

  async deleteFile(id: string, queryRunner?: QueryRunner) {
    const file = await this.findById(id);
    if (queryRunner) {
      await queryRunner.manager.delete(File, id);
    } else {
      await this.fileRepo.delete(id);
    }
    await this.cloudinaryService.deleteFile(file.key);
  }

  getFileFormat(file: Express.Multer.File): FileFormat {
    const format = file.mimetype.split('/')[1];
    if (format === 'video') {
      return FileFormat.VIDEO;
    }
    return FileFormat.IMAGE;
  }
}
