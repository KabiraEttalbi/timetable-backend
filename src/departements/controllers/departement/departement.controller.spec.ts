import { Test, TestingModule } from '@nestjs/testing';
import { DepartementController } from './departement.controller';

describe('DepartementController', () => {
  let controller: DepartementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepartementController],
    }).compile();

    controller = module.get<DepartementController>(DepartementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
