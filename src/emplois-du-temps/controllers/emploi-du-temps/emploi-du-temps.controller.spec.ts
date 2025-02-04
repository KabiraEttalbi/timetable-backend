import { Test, TestingModule } from '@nestjs/testing';
import { EmploiDuTempsController } from './emploi-du-temps.controller';
import { EmploiDuTempsService } from '../../services/emploi-du-temps/emploi-du-temps.service';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { EmploiDuTemps, ScheduleType } from '../../models/emploiDuTemps.model';
import { Types } from 'mongoose';

// Mock service for EmploiDuTempsService
const mockEmploiDuTempsService = {
  createAutomatique: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  filtrerEmploisDuTemps: jest.fn(),
};

describe('EmploiDuTempsController', () => {
  let controller: EmploiDuTempsController;
  let service: EmploiDuTempsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmploiDuTempsController],
      providers: [
        {
          provide: EmploiDuTempsService,
          useValue: mockEmploiDuTempsService,
        },
      ],
    }).compile();

    controller = module.get<EmploiDuTempsController>(EmploiDuTempsController);
    service = module.get<EmploiDuTempsService>(EmploiDuTempsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an emploi du temps', async () => {
      const emploiDuTemps: EmploiDuTemps = {
        jour: 'Lundi',
        heureDebut: '08:00',
        heureFin: '10:00',
        module: new Types.ObjectId(),
        salle: new Types.ObjectId(),
        type: ScheduleType.STUDENT,
        user: new Types.ObjectId(),
      };
      mockEmploiDuTempsService.createAutomatique.mockResolvedValue(emploiDuTemps);
  
      const result = await controller.create(emploiDuTemps);
  
      expect(result).toEqual(emploiDuTemps);
      expect(mockEmploiDuTempsService.createAutomatique).toHaveBeenCalledWith(emploiDuTemps);
    });
  
    it('should throw an error if the end time is before the start time', async () => {
      const emploiDuTemps: EmploiDuTemps = {
        jour: 'Lundi',
        heureDebut: '10:00', // Heure de début
        heureFin: '08:00',   // Heure de fin plus tôt
        module: new Types.ObjectId(),
        salle: new Types.ObjectId(),
        type: ScheduleType.STUDENT,
        user: new Types.ObjectId(),
      };
  
      // Ici, vous testez que l'erreur est lancée lorsque l'heure de fin est avant l'heure de début.
      await expect(controller.create(emploiDuTemps)).rejects.toThrowError(BadRequestException);
    });
  
    it('should throw an error if creation fails', async () => {
      const emploiDuTemps: EmploiDuTemps = {
        jour: 'Lundi',
        heureDebut: '08:00',
        heureFin: '10:00',
        module: new Types.ObjectId(),
        salle: new Types.ObjectId(),
        type: ScheduleType.STUDENT,
        user: new Types.ObjectId(),
      };
      mockEmploiDuTempsService.createAutomatique.mockRejectedValue(new Error('Failed to create'));
  
      await expect(controller.create(emploiDuTemps)).rejects.toThrowError(BadRequestException);
    });
  });
  

  describe('findAll', () => {
    it('should return all emplois du temps', async () => {
      const emploisDuTemps: EmploiDuTemps[] = [
        {
          jour: 'Lundi',
          heureDebut: '08:00',
          heureFin: '10:00',
          module: new Types.ObjectId(),
          salle: new Types.ObjectId(),
          type: ScheduleType.STUDENT,
          user: new Types.ObjectId(),
        },
      ];
      mockEmploiDuTempsService.findAll.mockResolvedValue(emploisDuTemps);

      const result = await controller.findAll({});
      expect(result).toEqual(emploisDuTemps);
      expect(mockEmploiDuTempsService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return one emploi du temps', async () => {
      const emploiDuTempsId = new Types.ObjectId();
      const emploiDuTemps: EmploiDuTemps = {
        jour: 'Lundi',
        heureDebut: '08:00',
        heureFin: '10:00',
        module: new Types.ObjectId(),
        salle: new Types.ObjectId(),
        type: ScheduleType.STUDENT,
        user: new Types.ObjectId(),
      };
      mockEmploiDuTempsService.findOne.mockResolvedValue(emploiDuTemps);

      const result = await controller.findOne(emploiDuTempsId.toString());
      expect(result).toEqual(emploiDuTemps);
      expect(mockEmploiDuTempsService.findOne).toHaveBeenCalledWith(emploiDuTempsId.toString());
    });

    it('should throw an error if emploi du temps not found', async () => {
      const emploiDuTempsId = new Types.ObjectId();
      mockEmploiDuTempsService.findOne.mockResolvedValue(null);

      await expect(controller.findOne(emploiDuTempsId.toString())).rejects.toThrowError(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update an emploi du temps', async () => {
      const emploiDuTempsId = new Types.ObjectId();
      const emploiDuTemps: EmploiDuTemps = {
        jour: 'Lundi',
        heureDebut: '08:00',
        heureFin: '10:00',
        module: new Types.ObjectId(),
        salle: new Types.ObjectId(),
        type: ScheduleType.STUDENT,
        user: new Types.ObjectId(),
      };
      mockEmploiDuTempsService.update.mockResolvedValue(emploiDuTemps);

      const result = await controller.update(emploiDuTempsId.toString(), emploiDuTemps);
      expect(result).toEqual(emploiDuTemps);
      expect(mockEmploiDuTempsService.update).toHaveBeenCalledWith(emploiDuTempsId.toString(), emploiDuTemps);
    });

    it('should throw an error if update fails', async () => {
      const emploiDuTempsId = new Types.ObjectId();
      const emploiDuTemps: EmploiDuTemps = {
        jour: 'Lundi',
        heureDebut: '08:00',
        heureFin: '10:00',
        module: new Types.ObjectId(),
        salle: new Types.ObjectId(),
        type: ScheduleType.STUDENT,
        user: new Types.ObjectId(),
      };
      mockEmploiDuTempsService.update.mockResolvedValue(null);

      await expect(controller.update(emploiDuTempsId.toString(), emploiDuTemps)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete an emploi du temps', async () => {
      const emploiDuTempsId = new Types.ObjectId();
      const emploiDuTemps: EmploiDuTemps = {
        jour: 'Lundi',
        heureDebut: '08:00',
        heureFin: '10:00',
        module: new Types.ObjectId(),
        salle: new Types.ObjectId(),
        type: ScheduleType.STUDENT,
        user: new Types.ObjectId(),
      };
      mockEmploiDuTempsService.delete.mockResolvedValue(emploiDuTemps);

      const result = await controller.delete(emploiDuTempsId.toString());
      expect(result).toEqual(emploiDuTemps);
      expect(mockEmploiDuTempsService.delete).toHaveBeenCalledWith(emploiDuTempsId.toString());
    });

    it('should throw an error if delete fails', async () => {
      const emploiDuTempsId = new Types.ObjectId();
      mockEmploiDuTempsService.delete.mockResolvedValue(null);

      await expect(controller.delete(emploiDuTempsId.toString())).rejects.toThrowError(NotFoundException);
    });
  });

  describe('filter', () => {
    it('should return filtered emplois du temps', async () => {
      const emploiDuTempsId = new Types.ObjectId();
      const emploiDuTemps: EmploiDuTemps[] = [
        {
          jour: 'Lundi',
          heureDebut: '08:00',
          heureFin: '10:00',
          module: new Types.ObjectId(),
          salle: new Types.ObjectId(),
          type: ScheduleType.STUDENT,
          user: new Types.ObjectId(),
        },
      ];
      mockEmploiDuTempsService.filtrerEmploisDuTemps.mockResolvedValue(emploiDuTemps);

      const result = await controller.filter({ jour: 'Lundi' });
      expect(result).toEqual(emploiDuTemps);
      expect(mockEmploiDuTempsService.filtrerEmploisDuTemps).toHaveBeenCalledWith({ jour: 'Lundi' });
    });
  });
});
