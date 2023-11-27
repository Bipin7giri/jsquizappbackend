import { Injectable } from '@nestjs/common';
import { CreateDocumentationDto } from './dto/create-documentation.dto';
import { UpdateDocumentationDto } from './dto/update-documentation.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DocumentationService {
  constructor(private readonly prismaServices: PrismaService) {}
  create(createDocumentationDto: CreateDocumentationDto) {
    return this.prismaServices.documentation.create({
      data: {
        title: createDocumentationDto.title,
        content: createDocumentationDto.content,
        description: createDocumentationDto.description,
        shortDescription: createDocumentationDto.shortDescription,
      },
    });
  }

  findAll() {
    return this.prismaServices.documentation.findMany();
  }

  findOne(id: string) {
    return this.prismaServices.documentation.findFirst({ where: { id: id } });
  }

  update(id: string, updateDocumentationDto: UpdateDocumentationDto) {
    return this.prismaServices.documentation.update({
      where: { id: id },
      data: {
        content: updateDocumentationDto.content,
        description: updateDocumentationDto.description,
        title: updateDocumentationDto.title,
        shortDescription: updateDocumentationDto.title,
      },
    });
  }

  remove(id: string) {
    return this.prismaServices.documentation.delete({ where: { id: id } });
  }
}
