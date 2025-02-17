import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Salle } from '../../models/salle.model';
import { Types } from 'mongoose';
import { CreateSalleDto } from '../../dto/create-salle.dto';
import { UpdateSalleDto } from '../../dto/update-salle.dto';
@Injectable()
export class SalleService {
  constructor(
    @InjectModel(Salle.name) private readonly salleModel: Model<Salle>,
  ) {}

  async create(createSalleDto: CreateSalleDto): Promise<Salle> {
    const newSalle = new this.salleModel(createSalleDto);
    return newSalle.save();
  }

  async findAll(): Promise<Salle[]> {
    return this.salleModel.find().exec();
  }

  async findOne(id: string): Promise<Salle | null> {
    return this.salleModel.findById(id).exec();
  }

  async update(id: string, updateSalleDto: UpdateSalleDto): Promise<Salle | null> {
    return this.salleModel.findByIdAndUpdate(id, updateSalleDto, { new: true }).exec();
  }

  async delete(id: string): Promise<Salle | null> {
    return this.salleModel.findByIdAndDelete(id).exec();
  }



  // async getDisponibilitesSalles(moduleId: Types.ObjectId, capaciteMin: number, typeSalle: string): Promise<Salle[]> {
  //   return this.salleModel.find({
  //     'modules': moduleId,         
  //     disponible: true,
  //     capacite: { $gte: capaciteMin },  
  //     typeSalle: typeSalle,        
  //   })
  //   .populate({
  //     path: 'emploiDuTemps',        
  //     match: { module: moduleId },
  //     select: 'jour heureDebut heureFin'
  //   })
  //   .select('_id nom capacite typeSalle emploiDuTemps') // 🔥 Ajout explicite des champs
  //   .exec();
  // }
  
  
  
  
}