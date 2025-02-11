import { Controller, Post, Body } from '@nestjs/common';
import { NotificationService } from '../services/notification.service';
import {Types } from 'mongoose'

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  // Endpoint pour envoyer une notification
  @Post()
  async sendNotification(@Body() notificationDto: { userId: string; title: string; message: string }) {
    const { userId, title, message } = notificationDto;
    const objectId = new Types.ObjectId(userId); // Conversion ici
    await this.notificationService.envoyerNotification(objectId, title, message);
    return { message: 'Notification envoyée avec succès' };
  }
}
