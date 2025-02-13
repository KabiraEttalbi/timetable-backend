import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from '../../models/event.model';
import { CreateEventDto } from '../../dto/create-event.dto';
import { UpdateEventDto } from '../../dto/update-event.dto';
@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
  ) {}

  // Méthode de création avec DTO
  async create(createEventDto: CreateEventDto): Promise<Event> {
    const newEvent = new this.eventModel(createEventDto);  // Utilisation de CreateEventDto
    return newEvent.save();
  }

  async findAll(): Promise<Event[]> {
    return this.eventModel.find().exec();
  }

  async findOne(id: string): Promise<Event | null> {
    return this.eventModel.findById(id).exec();
  }

  // Méthode de mise à jour avec DTO
  async update(id: string, updateEventDto: UpdateEventDto): Promise<Event | null> {
    return this.eventModel.findByIdAndUpdate(id, updateEventDto, { new: true }).exec();  // Utilisation de UpdateEventDto
  }

  async delete(id: string): Promise<Event | null> {
    return this.eventModel.findByIdAndDelete(id).exec();
  }
}