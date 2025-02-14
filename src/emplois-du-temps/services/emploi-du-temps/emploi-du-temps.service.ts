import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEmploiDuTempsDto } from '../../dto/create-emploiDuTemps.dto';
import { UpdateEmploiDuTempsDto } from '../../dto/update-emploiDuTemps.dto';
import { EmploiDuTemps, EmploiDuTempsDocument } from '../../models/emploiDuTemps.model';

@Injectable()
export class EmploiDuTempsService {
  constructor(
    @InjectModel(EmploiDuTemps.name) private readonly emploiDuTempsModel: Model<EmploiDuTempsDocument>,
  ) {}

  async create(createEmploiDuTempsDto: CreateEmploiDuTempsDto): Promise<EmploiDuTemps> {
    const createdEmploiDuTemps = new this.emploiDuTempsModel(createEmploiDuTempsDto);
    return createdEmploiDuTemps.save();
  }

  async findAll(): Promise<EmploiDuTemps[]> {
    return this.emploiDuTempsModel.find().exec();
  }

  async findOne(id: string): Promise<EmploiDuTemps| null> {
    return this.emploiDuTempsModel.findById(id).exec();
  }

  async update(id: string, updateEmploiDuTempsDto: UpdateEmploiDuTempsDto): Promise<EmploiDuTemps| null> {
    return this.emploiDuTempsModel.findByIdAndUpdate(id, updateEmploiDuTempsDto, { new: true }).exec();
  }

  async remove(id: string): Promise<EmploiDuTemps| null> {
    return this.emploiDuTempsModel.findByIdAndDelete(id).exec();
  }
}