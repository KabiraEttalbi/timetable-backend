import { Test, TestingModule } from '@nestjs/testing';
import { TecherController } from './techer.controller';

describe('TecherController', () => {
  let controller: TecherController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TecherController],
    }).compile();

    controller = module.get<TecherController>(TecherController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
