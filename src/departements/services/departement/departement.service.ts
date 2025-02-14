import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Departement, DepartementDocument } from '../../models/departement.model';
import { CreateDepartementDto } from '../../dto/create-departement.dto';
import { UpdateDepartementDto } from '../../dto/update-departement.dto';

@Injectable()
export class DepartementService {
  constructor(
    @InjectModel(Departement.name)
    private departementModel: Model<DepartementDocument>,
  ) {}

  async create(createDepartementDto: CreateDepartementDto): Promise<Departement> {
    const createdDepartement = new this.departementModel(createDepartementDto);
    return createdDepartement.save();
  }

  async findAll(): Promise<Departement[]> {
    return this.departementModel.find().exec();
  }

  async findOne(id: string): Promise<Departement | null> {
    return this.departementModel.findById(id).exec();
  }

  async update(
    id: string,
    updateDepartementDto: UpdateDepartementDto,
  ): Promise<Departement | null> {
    return this.departementModel
      .findByIdAndUpdate(id, updateDepartementDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Departement | null> {
    return this.departementModel.findByIdAndDelete(id).exec();
  }

  async findOneWithDetails(id: string) {
    return this.departementModel
      .findById(id)
      .populate('teachers')
      .populate('modules')
      .populate('niveaux')
      .exec();
  }
}