import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { NestjsFormDataModule } from 'nestjs-form-data';
// gadget_quotes
@Module({
  imports: [
    NestjsFormDataModule,
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
