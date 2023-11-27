import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtService } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { HashService } from '../helper/hash.services';
import { ImageUploadService } from '../helper/imageupload.service';
import { AuthService } from '../auth/auth.service';
import { LocalStrategy } from '../auth/local.strategy';
import { JwtStrategy } from '../auth/jwt.strategy';
import multer from 'multer';
import * as dotenv from 'dotenv';
import { PrismaService } from 'src/prisma.service';
dotenv.config();
const env = process.env.NODE_ENV;
@Module({
  imports: [
    // env
    //   ? MulterModule.register({
    //       dest:"./files"
    //     })
    //   :
    MulterModule.register({
      storage: multer?.memoryStorage(),
    }),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    HashService,
    AuthService,
    JwtService,
    LocalStrategy,
    JwtStrategy,
    ImageUploadService,
    PrismaService,
  ],
})
export class UsersModule {}
