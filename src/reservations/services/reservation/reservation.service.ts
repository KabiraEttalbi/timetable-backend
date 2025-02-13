import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reservation } from '../../models/reservation.model';
import { CreateReservationDto } from '../../dto/create-reservation.dto';
import { UpdateReservationDto } from '../../dto/update-reservation.dto';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation.name) private readonly reservationModel: Model<Reservation>,
  ) {}

 
  async create(reservationDto: CreateReservationDto): Promise<Reservation> {
    const newReservation = new this.reservationModel(reservationDto);
    return newReservation.save();
  }

 
  async findAll(): Promise<Reservation[]> {
    return this.reservationModel.find().exec();
  }


  async findOne(id: string): Promise<Reservation | null> {
    return this.reservationModel.findById(id).exec();
  }

  
  async update(id: string, reservationDto: UpdateReservationDto): Promise<Reservation | null> {
    return this.reservationModel.findByIdAndUpdate(id, reservationDto, { new: true }).exec();
  }


  async delete(id: string): Promise<Reservation | null> {
    return this.reservationModel.findByIdAndDelete(id).exec();
  }
}
