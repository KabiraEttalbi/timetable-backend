import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reservation } from '../../models/reservation.model';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation.name) private readonly reservationModel: Model<Reservation>,
  ) {}

  async create(reservation: Reservation): Promise<Reservation> {
    const newReservation = new this.reservationModel(reservation);
    return newReservation.save();
  }

  async findAll(): Promise<Reservation[]> {
    return this.reservationModel.find().exec();
  }

  async findOne(id: string): Promise<Reservation | null> {
    return this.reservationModel.findById(id).exec();
  }

  async update(id: string, reservation: Reservation): Promise<Reservation | null> {
    return this.reservationModel.findByIdAndUpdate(id, reservation, { new: true }).exec();
  }

  async delete(id: string): Promise<Reservation | null> {
    return this.reservationModel.findByIdAndDelete(id).exec();
  }
}