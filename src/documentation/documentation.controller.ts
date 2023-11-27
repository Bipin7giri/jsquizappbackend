import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DocumentationService } from './documentation.service';
import { CreateDocumentationDto } from './dto/create-documentation.dto';
import { UpdateDocumentationDto } from './dto/update-documentation.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('documentation')
@Controller('documentation')
export class DocumentationController {
  constructor(private readonly documentationService: DocumentationService) {}

  @Post()
  create(@Body() createDocumentationDto: CreateDocumentationDto) {
    return this.documentationService.create(createDocumentationDto);
  }

  @Get()
  findAll() {
    return this.documentationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentationService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDocumentationDto: UpdateDocumentationDto,
  ) {
    return this.documentationService.update(id, updateDocumentationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentationService.remove(id);
  }
}
