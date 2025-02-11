import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Salle } from '../../models/salle.model';
import { Types } from 'mongoose';

@Injectable()
export class SalleService {
  constructor(
    @InjectModel(Salle.name) private readonly salleModel: Model<Salle>,
  ) {}

  async create(salle: Salle): Promise<Salle> {
    const newSalle = new this.salleModel(salle);
    return newSalle.save();
  }

  async findAll(): Promise<Salle[]> {
    return this.salleModel.find().exec();
  }

  async findOne(id: string): Promise<Salle | null> {
    return this.salleModel.findById(id).exec();
  }

  async update(id: string, salle: Salle): Promise<Salle  | null> {
    return this.salleModel.findByIdAndUpdate(id, salle, { new: true }).exec();
  }

  async delete(id: string): Promise<Salle | null> {
    return this.salleModel.findByIdAndDelete(id).exec();
  }

  // Method to get available rooms for a module
  async getSallesDisponibles(module: any): Promise<any[]> {
    // Implement the logic to fetch available rooms based on the module
    // This could involve checking room capacities, equipment, etc.
    const availableRooms = []; // Replace with actual logic to fetch rooms
    return availableRooms;
  }
  async getDisponibilitesSalles(moduleId: Types.ObjectId): Promise<any[]> {
    // Implémentez la logique pour récupérer les disponibilités des salles
    return this.salleModel.find({ module: moduleId, disponible: true }).exec();
  }
}