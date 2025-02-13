import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common'; 
import { NotificationService } from '../services/notification.service';
import { Types } from 'mongoose';
import { CreateNotificationDto } from '../dto/create-notification.dto';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  // Endpoint pour envoyer une notification
  @Post()
  async sendNotification(@Body() notificationDto: CreateNotificationDto) {
    try {
      // Appel à la méthode du service pour envoyer la notification
      await this.notificationService.envoyerNotification(notificationDto);

      // Réponse de succès avec statut 201
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Notification envoyée avec succès',
      };
    } catch (error) {
      // Gestion des erreurs : retourner une exception HTTP
      throw new HttpException(
        `Erreur dans l'envoi de la notification : ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}