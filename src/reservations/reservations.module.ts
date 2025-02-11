import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Reservation, ReservationSchema } from './models/reservation.model';
import { ReservationService } from './services/reservation/reservation.service';
import { ReservationController } from './controllers/reservation/reservation.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Reservation.name, schema: ReservationSchema }]), // Ajout du modèle
  ],
  providers: [ReservationService],
  controllers: [ReservationController],
  exports: [ReservationService], // Si utilisé dans un autre module
})
export class ReservationModule {}