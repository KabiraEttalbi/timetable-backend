import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateEmploiDuTempsDto } from '../../dto/create-emploiDuTemps.dto';
import { UpdateEmploiDuTempsDto } from '../../dto/update-emploiDuTemps.dto';
import { EmploiDuTemps, EmploiDuTempsDocument, ScheduleType } from '../../models/emploiDuTemps.model';
import { DepartementService } from '../../../departements/services/departement/departement.service';

@Injectable()
export class EmploiDuTempsService {
  constructor(
    @InjectModel(EmploiDuTemps.name) private readonly emploiDuTempsModel: Model<EmploiDuTempsDocument>,
    private readonly departementService: DepartementService,
  ) { }

  async create(createEmploiDuTempsDto: CreateEmploiDuTempsDto): Promise<EmploiDuTemps> {
    const createdEmploiDuTemps = new this.emploiDuTempsModel(createEmploiDuTempsDto);
    return createdEmploiDuTemps.save();
  }

  async findAll(): Promise<EmploiDuTemps[]> {

    return this.emploiDuTempsModel.find()
    .populate('user')      
    .populate('module')
    .populate('salle').exec();

  }

  async findOne(id: string): Promise<EmploiDuTemps | null> {
    return this.emploiDuTempsModel.findById(id).populate('module')
    .populate('salle').populate(`user`).exec();
  }

  async update(id: string, updateEmploiDuTempsDto: UpdateEmploiDuTempsDto): Promise<EmploiDuTemps | null> {
    return this.emploiDuTempsModel.findByIdAndUpdate(id, updateEmploiDuTempsDto, { new: true })
      .populate('user')      
      .populate('module')
      .populate('salle')
      .exec();
  }

  async remove(id: string): Promise<EmploiDuTemps | null> {
    return this.emploiDuTempsModel.findByIdAndDelete(id).exec();
  }
  async getScheduleByStudent(studentId: string) {
    return this.emploiDuTempsModel.find({ user: studentId, type: 'student' })
      .populate('user')      
      .populate('module')
      .populate('salle')
      .populate(`user`)
      .exec();
  }


  /**
   * Retourne un jour aléatoire de la semaine.
   */
  private getRandomDay(): string {
    const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
    return days[Math.floor(Math.random() * days.length)];
  }

  /**
   * Retourne une heure aléatoire entre 8h et 18h.
   */
  private getRandomTime(): string {
    const hour = Math.floor(Math.random() * 10) + 8; // Entre 8h et 18h
    const minute = Math.floor(Math.random() * 60); // Entre 0 et 59 minutes
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  }

  /**
   * Retourne une salle aléatoire.
   */
  private getRandomSalle(): string {
    const salles = ['Salle A1', 'Salle B2', 'Salle C3', 'Salle D4'];
    return salles[Math.floor(Math.random() * salles.length)];
  }
}
