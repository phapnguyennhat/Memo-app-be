import { Controller } from '@nestjs/common';
import { FileService } from './file.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Controller('file')
export class FileController {
  constructor(
    private readonly fileService: FileService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  // @Post()
  // @UseInterceptors(FileInterceptor('file'))
  // async upload(@UploadedFile(imageValidatorPipe) file: Express.Multer.File) {
  //   const resultUpload = await this.cloudinaryService.uploadFile(file, 'Memo');
  //   const fileEntity = this.fileService.create({
  //     key: resultUpload.key,
  //     url: resultUpload.url,
  //     format: this.fileService.getFileFormat(file),
  //     name: file.originalname,
  //   });
  //   return fileEntity;
  // }

  // @Delete(':id')
  // async delete(@Param('id') id: string) {
  //   const file = await this.fileService.findById(id);
  //   await this.fileService.deleteFile(file);
  //   return {
  //     message: 'File deleted successfully',
  //   };
  // }
}
