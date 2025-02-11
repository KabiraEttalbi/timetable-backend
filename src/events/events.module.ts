import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from './models/event.model';
import { EventService } from './services/event/event.service';
import { EventController } from './controllers/event/event.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]), // Ajout du modèle
  ],
  providers: [EventService],
  controllers: [EventController],
  exports: [EventService], // Si utilisé dans un autre module
})
export class EventsModule {}