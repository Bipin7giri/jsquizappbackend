import { Module } from '@nestjs/common';
import { DocumentationService } from './documentation.service';
import { DocumentationController } from './documentation.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [DocumentationController],
  providers: [DocumentationService, PrismaService],
})
export class DocumentationModule {}
