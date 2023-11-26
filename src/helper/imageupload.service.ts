import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dnmkc7jqh',
  api_key: '524988572976383',
  api_secret: 'xWeT6gmmWTO7Qf-qnsChLUgSLdM',
});

@Injectable()
export class ImageUploadService {
  async uploadImage(path: string): Promise<any> {
    try {
      const imageUrl = await cloudinary.uploader.upload(path);
      return imageUrl.secure_url;
    } catch (err) {
      return err;
    }
  }

  async uploadImageFromBuffer(buffer: Buffer): Promise<any> {
    try {
      return new Promise(async (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: 'image' },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result.secure_url);
            }
          }
        );
  
        uploadStream.end(buffer);
      });
    } catch (err) {
      return err;
    }
  }
  
}
