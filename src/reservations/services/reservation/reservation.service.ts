import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reservation } from '../../models/reservation.model';
import { CreateReservationDto } from '../../dto/create-reservation.dto';
import { UpdateReservationDto } from '../../dto/update-reservation.dto';
import { EventService } from 'src/events/services/event/event.service';
import { CreateEventDto } from 'src/events/dto/create-event.dto';
import { UpdateEventDto } from 'src/events/dto/update-event.dto';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation.name)
    private readonly reservationModel: Model<Reservation>,
    private readonly eventService: EventService, // Inject EventService
  ) {}

  async create(reservationDto: CreateReservationDto): Promise<Reservation> {
        // Validate module for course, tp, or td
        if (['course', 'tp', 'td'].includes(reservationDto.type)) {
          if (!reservationDto.module) {
            throw new BadRequestException('Module is required for course, tp, or td reservations');
          }
        }
    
        const newReservation = new this.reservationModel(reservationDto);
        const savedReservation = await newReservation.save();
    
        // If the type is 'event', create an Event
        if (reservationDto.type === 'event') {
          const createEventDto: CreateEventDto = {
            title: reservationDto.title, // Use the title provided by the user
            description: reservationDto.description, // Use the description provided by the user
            date: new Date(reservationDto.date),
            heureDebut: reservationDto.heureDebut,
            heureFin: reservationDto.heureFin,
            organizer: reservationDto.user, // Use the user ID as the organizer
            reservation: savedReservation._id, // Add the reservation reference
          };
      await this.eventService.create(createEventDto);
    }

    return savedReservation;
  }

  async findAll(): Promise<Reservation[]> {
    return this.reservationModel.find()
    .populate('salle')
    .populate('user')
    .populate('module')
    .exec();
  }

  async findOne(id: string): Promise<Reservation | null> {
    return this.reservationModel.findById(id)
    .populate('salle')
    .populate('user')
    .populate('module')
    .exec();
  }

  async update(
    id: string,
    updateReservationDto: UpdateReservationDto,
  ): Promise<Reservation | null> {
    // Find the existing reservation
    const existingReservation = await this.reservationModel.findById(id)
    .populate('salle')
    .populate('user')
    .populate('module')
    .exec();
    if (!existingReservation) {
      throw new NotFoundException('Reservation not found');
    }

    // Validate module for course, tp, or td
    if (updateReservationDto.type && ['course', 'tp', 'td'].includes(updateReservationDto.type)) {
      if (!updateReservationDto.module) {
        throw new BadRequestException('Module is required for course, tp, or td reservations');
      }
    }
       // If the type is updated to 'event', create or update the associated Event
       if (updateReservationDto.type === 'event') {
        const eventDto: CreateEventDto | UpdateEventDto = {
          title: updateReservationDto.title || existingReservation.title,
          description: updateReservationDto.description || existingReservation.description,
          date: updateReservationDto.date ? new Date(updateReservationDto.date) : existingReservation.date,
          heureDebut: updateReservationDto.heureDebut || existingReservation.heureDebut,
          heureFin: updateReservationDto.heureFin || existingReservation.heureFin,
          organizer: updateReservationDto.user || existingReservation.user,
          reservation: existingReservation._id, // Link to the reservation
        };
  
        // Check if an Event already exists for this reservation
        const existingEvent = await this.eventService.findOneByReservation(existingReservation._id);
        if (existingEvent) {
          // Update the existing Event
          await this.eventService.update(existingEvent._id.toString(), eventDto as UpdateEventDto);
        } else {
          // Create a new Event
          await this.eventService.create(eventDto as CreateEventDto);
        }
      } else if (existingReservation.type === 'event') {
        // If the type is updated from 'event' to something else, delete the associated Event
        await this.eventService.deleteByReservation(existingReservation._id);
      }
  
      // Update the reservation
      const updatedReservation = await this.reservationModel
        .findByIdAndUpdate(id, updateReservationDto, { new: true })
        .populate('salle')
        .populate('user')
        .populate('module')
        .exec();
  
      return updatedReservation;
    }

    async delete(id: string): Promise<Reservation | null> {
      const reservation = await this.reservationModel.findById(id)
      .populate('salle')
      .populate('user')
      .populate('module')
      .exec();
      if (!reservation) {
        throw new NotFoundException('Reservation not found');
      }
  
      // If the reservation is of type 'event', delete the associated Event
      if (reservation.type === 'event') {
        await this.eventService.deleteByReservation(reservation._id);
      }
  
      return this.reservationModel.findByIdAndDelete(id).exec();
    }
} 