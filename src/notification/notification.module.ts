import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Notification, NotificationSchema } from './models/notification.model';
import { NotificationService } from './services/notification.service';
import { NotificationController } from './controllers/notification.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Notification.name, schema: NotificationSchema }]), // Ajout du modèle
  ],
  providers: [NotificationService],
  controllers: [NotificationController],
  exports: [NotificationService], // Si utilisé dans un autre module
})
export class NotificationModule {}