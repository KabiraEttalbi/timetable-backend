import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Departement, DepartementDocument } from 'src/departements/models/departement.model';
import { CreateOptionDto } from 'src/options/dto/create-option.dto';
import { UpdateOptionDto } from 'src/options/dto/update-option.dto';
import { Option, OptionDocument } from 'src/options/models/option.model';


@Injectable()
export class OptionService {
  constructor(
    @InjectModel(Option.name)
    private optionModel: Model<OptionDocument>,
    @InjectModel(Departement.name)
    private departementModel: Model<DepartementDocument>,
  ) {}

  async create(createOptionDto: CreateOptionDto): Promise<Option> {
    // Check if the referenced department exists
    const department = await this.departementModel
      .findById(createOptionDto.department)
      .exec();
    if (!department) {
      throw new NotFoundException('Department not found');
    }

    const createdOption = new this.optionModel(createOptionDto);
    return createdOption.save();
  }

  async findAll(): Promise<Option[]> {
    return this.optionModel.find().populate('department').exec();
  }

  async findOne(id: string): Promise<Option | null> {
    return this.optionModel.findById(id).populate('department').exec();
  }

  async update(
    id: string,
    updateOptionDto: UpdateOptionDto,
  ): Promise<Option | null> {
    return this.optionModel
      .findByIdAndUpdate(id, updateOptionDto, { new: true })
      .populate('department')
      .exec();
  }

  async delete(id: string): Promise<Option | null> {
    return this.optionModel.findByIdAndDelete(id).exec();
  }
}