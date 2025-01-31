import { Test, TestingModule } from '@nestjs/testing';
import { EmploiDuTempsService } from './emploi-du-temps.service';

describe('EmploiDuTempsService', () => {
  let service: EmploiDuTempsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmploiDuTempsService],
    }).compile();

    service = module.get<EmploiDuTempsService>(EmploiDuTempsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
