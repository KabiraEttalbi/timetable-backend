import { Controller, Post, Body } from '@nestjs/common';
import { NotificationService } from '../services/notification.service';


@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  // Endpoint pour envoyer une notification
  @Post()
  async sendNotification(@Body() notificationDto: { userId: string; message: string }) {
    const { userId, message } = notificationDto;
    await this.notificationService.envoyerNotification(userId, message);
    return { message: 'Notification envoyée avec succès' };
  }
}
