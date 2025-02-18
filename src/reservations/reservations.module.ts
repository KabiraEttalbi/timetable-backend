import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Reservation, ReservationSchema } from './models/reservation.model';
import { ReservationService } from './services/reservation/reservation.service';
import { ReservationController } from './controllers/reservation/reservation.controller';
import { EventSchema, Event } from 'src/events/models/event.model';
import { EventService } from 'src/events/services/event/event.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Reservation.name, schema: ReservationSchema }, { name: Event.name, schema: EventSchema }, // Register Event model
    ]), // Ajout du modèle
  ],
  providers: [ReservationService, EventService],
  controllers: [ReservationController],
  exports: [ReservationService], // Si utilisé dans un autre module
})
export class ReservationModule {}