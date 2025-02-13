import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Notification, NotificationDocument } from '../models/notification.model';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import { CreateNotificationDto } from '../dto/create-notification.dto';

@Injectable()
export class NotificationService {
  private transporter: nodemailer.Transporter;

  constructor(
    @InjectModel(Notification.name) private readonly notificationModel: Model<NotificationDocument>,
  ) {
    // Configuration de Nodemailer pour Gmail
    dotenv.config();

    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });
  }

  /**
   * Envoyer une notification par e-mail et l'enregistrer dans la base de données
   * @param userId ID de l'utilisateur
   * @param title Titre de la notification (ex: "Changement d'horaire")
   * @param message Contenu de la notification
   */
  async envoyerNotification(createNotificationDto: CreateNotificationDto): Promise<void> {
    try {
      // Enregistrer la notification dans la base de données
      const nouvelleNotification = new this.notificationModel({
        userId: createNotificationDto.userId,
        title: createNotificationDto.title,
        message: createNotificationDto.message,
        lue: false,
        date: new Date(),
      });
      await nouvelleNotification.save();

      // Envoyer un e-mail
      const utilisateur = await this.getUserInfo(createNotificationDto.userId);
      if (utilisateur && utilisateur.email) {
        await this.envoyerEmail(utilisateur.email, createNotificationDto.title, createNotificationDto.message);
      } else {
        throw new Error('Aucun e-mail trouvé pour l\'utilisateur : ' + createNotificationDto.userId);
      }
    } catch (error) {
      console.error('Erreur dans l\'envoi de la notification :', error);
      throw new Error('Échec de l\'envoi de la notification');
    }
  }

  /**
   * Envoyer un e-mail via Gmail
   * @param destinataire Adresse e-mail du destinataire
   * @param sujet Sujet de l'e-mail (titre de la notification)
   * @param contenu Contenu de l'e-mail (message de la notification)
   */
  // Méthode pour envoyer un e-mail
  private async envoyerEmail(destinataire: string, sujet: string, contenu: string): Promise<void> {
    const mailOptions = {
      from: 'oumaymarochdi01@gmail.com', // Remplacez par votre adresse Gmail
      to: destinataire,
      subject: sujet,
      text: contenu,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`E-mail envoyé à ${destinataire}`);
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
      throw new Error('Échec de l\'envoi de l\'e-mail');
    }
  }
  /**
   * Récupérer les informations de l'utilisateur (e-mail)
   * @param userId ID de l'utilisateur
   * @returns Informations de l'utilisateur (e-mail)
   */
  private async getUserInfo(userId: Types.ObjectId): Promise<{ email: string } | null> {
    // Simuler une récupération des informations de l'utilisateur depuis la base de données
    // Remplacez cette logique par une requête à votre base de données
    // Exemple fictif :
    const utilisateurs = [
      { _id: '65f8e4b7e4b7e4b7e4b7e4b7', email: 'etudiant@example.com' }, // Exemple d'étudiant
      { _id: '65f8e4b7e4b7e4b7e4b7e4b8', email: 'enseignant@example.com' }, // Exemple d'enseignant
    ];

    const utilisateur = utilisateurs.find((u) => u._id === userId.toString());
    return utilisateur ? { email: utilisateur.email } : null;
  }
}