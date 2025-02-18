import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
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

  // Méthode de mise à jour avec DTO
  async update(id: string, updateEventDto: UpdateEventDto): Promise<Event | null> {
    return this.eventModel
      .findByIdAndUpdate(id, updateEventDto, { new: true })
      .populate('organizer')
      .populate('reservation')
      .exec();
  }

  async findOneByReservation(reservationId: Types.ObjectId): Promise<Event | null> {
    return this.eventModel.findOne({ reservation: reservationId })
    .populate('organizer')
    .populate('reservation')
    .exec();
  }

  async deleteByReservation(reservationId: Types.ObjectId): Promise<void> {
    await this.eventModel.deleteOne({ reservation: reservationId })
    .populate('organizer')
    .populate('reservation')
    .exec();
  }

  async findAll(): Promise<Event[]> {
    return this.eventModel.find()
    .populate('organizer')
    .populate('reservation')
    .exec();
  }

  async findOne(id: string): Promise<Event | null> {
    return this.eventModel.findById(id)
    .populate('organizer')
    .populate('reservation')
    .exec();
  }

  async delete(id: string): Promise<Event | null> {
    return this.eventModel.findByIdAndDelete(id)
    .populate('organizer')
    .populate('reservation')
    .exec();
  }
}