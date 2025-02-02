import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmploiDuTemps } from '../../models/emploiDuTemps.model';

@Injectable()
export class EmploiDuTempsService {
  constructor(
    @InjectModel(EmploiDuTemps.name) private readonly emploiDuTempsModel: Model<EmploiDuTemps>,
  ) {}

  async create(emploiDuTemps: EmploiDuTemps): Promise<EmploiDuTemps> {
    const newEmploiDuTemps = new this.emploiDuTempsModel(emploiDuTemps);
    return newEmploiDuTemps.save();
  }

  async findAll(): Promise<EmploiDuTemps[]> {
    return this.emploiDuTempsModel.find().exec();
  }

  async findOne(id: string): Promise<EmploiDuTemps | null> {
    return this.emploiDuTempsModel.findById(id).exec();
  }

  async update(id: string, emploiDuTemps: EmploiDuTemps): Promise<EmploiDuTemps | null> {
    return this.emploiDuTempsModel.findByIdAndUpdate(id, emploiDuTemps, { new: true }).exec();
  }

  async delete(id: string): Promise<EmploiDuTemps | null> {
    return this.emploiDuTempsModel.findByIdAndDelete(id).exec();
  }
}