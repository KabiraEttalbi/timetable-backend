import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ReservationService } from '../../services/reservation/reservation.service';
import { Reservation } from '../../models/reservation.model';
import { CreateReservationDto } from '../../dto/create-reservation.dto';
import { UpdateReservationDto } from '../../dto/update-reservation.dto';
@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  async create(@Body() reservationDto: CreateReservationDto): Promise<Reservation> {
    return this.reservationService.create(reservationDto);
  }

  @Get()
  async findAll(): Promise<Reservation[]> {
    return this.reservationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Reservation | null> {
    return this.reservationService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() reservationDto: UpdateReservationDto): Promise<Reservation | null> {
    return this.reservationService.update(id, reservationDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Reservation| null> {
    return this.reservationService.delete(id);
  }
}