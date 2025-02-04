import { Module } from '@nestjs/common';
import { NotificationService } from './services/notification.service';
import { NotificationController } from './controllers/notification.controller';


@Module({
  providers: [NotificationService],  // Déclare le service ici
  controllers: [NotificationController],  // Déclare le contrôleur ici
})
export class NotificationModule {}
