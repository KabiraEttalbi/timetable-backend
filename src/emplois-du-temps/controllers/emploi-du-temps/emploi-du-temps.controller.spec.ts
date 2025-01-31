import { Test, TestingModule } from '@nestjs/testing';
import { EmploiDuTempsController } from './emploi-du-temps.controller';

describe('EmploiDuTempsController', () => {
  let controller: EmploiDuTempsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmploiDuTempsController],
    }).compile();

    controller = module.get<EmploiDuTempsController>(EmploiDuTempsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
