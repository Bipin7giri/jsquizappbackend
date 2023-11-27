import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { DocumentationModule } from './documentation/documentation.module';
@Module({
  imports: [
    NestjsFormDataModule,
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    DocumentationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
