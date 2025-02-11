import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Module } from '../../models/module.model';

@Injectable()
export class ModuleService {
  constructor(
    @InjectModel(Module.name) private readonly moduleModel: Model<Module>,
  ) {}

  async create(module: Module): Promise<Module> {
    const newModule = new this.moduleModel(module);
    return newModule.save();
  }

  async findAll(): Promise<Module[]> {
    return this.moduleModel.find().exec();
  }

  async findOne(id: string): Promise<Module | null> {
    return this.moduleModel.findById(id).exec();
  }

  async update(id: string, module: Module): Promise<Module | null> {
    return this.moduleModel.findByIdAndUpdate(id, module, { new: true }).exec();
  }

  async delete(id: string): Promise<Module | null> {
    return this.moduleModel.findByIdAndDelete(id).exec();
  }
}