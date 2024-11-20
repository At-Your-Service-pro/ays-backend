import { Test, TestingModule } from '@nestjs/testing';
import { ServiceController } from './servicess.controller';

describe('ServicessController', () => {
  let controller: ServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceController],
    }).compile();

    controller = module.get<ServiceController>(ServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
