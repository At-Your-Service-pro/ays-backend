import { Test, TestingModule } from '@nestjs/testing';
import { ServiceService } from './servicess.service';

describe('ServicessService', () => {
  let service: ServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceService],
    }).compile();

    service = module.get<ServiceService>(ServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
