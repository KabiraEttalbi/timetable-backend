import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Niveau } from '../../models/niveau.model';

@Injectable()
export class NiveauService {
  constructor(
    @InjectModel(Niveau.name) private readonly niveauModel: Model<Niveau>,
  ) {}

  async create(niveau: Niveau): Promise<Niveau> {
    const newNiveau = new this.niveauModel(niveau);
    return newNiveau.save();
  }

  async findAll(): Promise<Niveau[]> {
    return this.niveauModel.find().exec();
  }

  async findOne(id: string): Promise<Niveau | null> { 
    return this.niveauModel.findById(id).exec();
  }

  async update(id: string, niveau: Niveau): Promise<Niveau | null> {
    return this.niveauModel.findByIdAndUpdate(id, niveau, { new: true }).exec();
  }

  async delete(id: string): Promise<Niveau | null> {
    return this.niveauModel.findByIdAndDelete(id).exec();
  }
}