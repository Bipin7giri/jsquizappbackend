import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, v2 as cloudinary } from 'cloudinary';

@Injectable()
export class ImageUploadService {
  constructor() {
    cloudinary.config({
        cloud_name: 'dnmkc7jqh',
        api_key: '524988572976383',
        api_secret: 'xWeT6gmmWTO7Qf-qnsChLUgSLdM',
    });
  }

  async uploadImage(buffer: Buffer): Promise<string> {
    try {
      const result:any =  cloudinary.uploader.upload_stream({
        resource_type: 'image',
        folder: 'blog_images', // Optional: You can specify a folder in Cloudinary
      }, (error:UploadApiErrorResponse, result:any) => {
        if (error) {
          throw new Error(error.message);
        }
      }).end(buffer);
      console.log("ok")

      // Return the public URL of the uploaded image
      return result.secure_url;
    } catch (error) {
      throw new Error(error);
    }
  }
}
