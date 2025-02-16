import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Module } from '../../models/module.model';
import { CreateModuleDto } from '../../dto/create-module.dto';
import { UpdateModuleDto } from '../../dto/update-module.dto';


@Injectable()
export class ModuleService {
  constructor(
    @InjectModel(Module.name) private readonly moduleModel: Model<Module>,
  ) {}

  async create(createModuleDto: CreateModuleDto): Promise<Module> {
    const newModule = new this.moduleModel(createModuleDto);
    return newModule.save();
  }

  async findAll(): Promise<Module[]> {
    return this.moduleModel
      .find()
      .populate({
        path: 'teacher',
        populate: {
          path: 'user', // Populate the 'user' field inside 'teacher'
        },
      })
      .populate('option')
      .populate('niveau')
      .exec();
  }

  async findOne(id: string): Promise<Module | null> {
    return this.moduleModel
      .findById(id)
      .populate({
        path: 'teacher',
        populate: {
          path: 'user', // Populate the 'user' field inside 'teacher'
        },
      })
      .populate('option')
      .populate('niveau')
      .exec();
  }

  async update(id: string, updateModuleDto: UpdateModuleDto): Promise<Module | null> {
    return this.moduleModel
      .findByIdAndUpdate(id, updateModuleDto, { new: true })
      .populate({
        path: 'teacher',
        populate: {
          path: 'user', // Populate the 'user' field inside 'teacher'
        },
      })
      .populate('option')
      .populate('niveau')
      .exec();
  }

  async delete(id: string): Promise<Module | null> {
    return this.moduleModel.findByIdAndDelete(id).exec();
  }
}