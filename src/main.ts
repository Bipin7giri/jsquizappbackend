import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { inject } from '@vercel/analytics';

inject();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('JSQ')
    .setDescription('JSQ')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  app.enableCors();
  SwaggerModule.setup('/api', app, document);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
