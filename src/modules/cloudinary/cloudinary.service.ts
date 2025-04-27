import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor(private readonly configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadFile(file: Express.Multer.File, folder: string) {
    const uploadResult = await new Promise((resolve) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder,
            resource_type: 'auto',
            filename_override: file.originalname,
          },
          (error, uploadResult) => {
            return resolve(uploadResult);
          },
        )
        .end(file.buffer);
    });
    return {
      key: (uploadResult as any).public_id,
      url: (uploadResult as any).secure_url,
    };
  }

  async deleteFile(key: string) {
    const result = await cloudinary.uploader.destroy(key);
    return result;
  }
}
