import { Test, TestingModule } from '@nestjs/testing';
import { DocumentationService } from './documentation.service';

describe('DocumentationService', () => {
  let service: DocumentationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocumentationService],
    }).compile();

    service = module.get<DocumentationService>(DocumentationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
