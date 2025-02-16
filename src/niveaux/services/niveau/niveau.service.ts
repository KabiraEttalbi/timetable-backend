import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Niveau } from '../../models/niveau.model';
import { CreateNiveauDto } from '../../dto/create-niveau.dto';
import { UpdateNiveauDto } from '../..//dto/update-niveau.dto';

@Injectable()
export class NiveauService {
  constructor(
    @InjectModel(Niveau.name) private readonly niveauModel: Model<Niveau>,
  ) {}

  async create(createNiveauDto: CreateNiveauDto): Promise<Niveau> {
    const newNiveau = new this.niveauModel(createNiveauDto);
    return newNiveau.save();
  }


  async findAll(): Promise<Niveau[]> {
    return this.niveauModel.find().populate('option').exec();
  }

  async findOne(id: string): Promise<Niveau | null> { 
    return this.niveauModel.findById(id).populate('option').exec();
  }

  async update(id: string, updateNiveauDto: UpdateNiveauDto): Promise<Niveau | null> {
    return this.niveauModel.findByIdAndUpdate(id, updateNiveauDto, { new: true }).populate('option').exec();
  }

  async delete(id: string): Promise<Niveau | null> {
    return this.niveauModel.findByIdAndDelete(id).exec();
  }
}