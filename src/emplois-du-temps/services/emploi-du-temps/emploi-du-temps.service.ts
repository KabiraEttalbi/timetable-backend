import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { EmploiDuTemps, EmploiDuTempsDocument ,ScheduleType } from '../../models/emploiDuTemps.model';
import { SalleService } from '../../../salles/services/salle/salle.service';
import { NotificationService } from '../../../notification/services/notification.service';
import  { Module } from '../../../modules/models/module.model'; 
import { Teacher } from '../../../teachers/models/teacher.model';
@Injectable()
export class EmploiDuTempsService {
  constructor(
    @InjectModel(EmploiDuTemps.name) private readonly emploiDuTempsModel: Model<EmploiDuTempsDocument>,
    @InjectModel(Module.name) private readonly moduleModel: Model<Module>, // Injecter le modèle Module
    @InjectModel(Teacher.name) private readonly teacherModel: Model<Teacher>, // Injecter le modèle Teacher
    private readonly salleService: SalleService, 
    private readonly notificationService: NotificationService 
   
  ) {}

  async createAutomatique(emploiDuTemps: EmploiDuTemps): Promise<EmploiDuTemps> {
    if (!emploiDuTemps.module) {
      throw new Error("Module non spécifié.");
    }

    // Récupération de l'emploi du temps
// Remplacez l'utilisation de _id par un autre champ pour la recherche
const emploiData = await this.emploiDuTempsModel.findOne({ module: emploiDuTemps.module, jour: emploiDuTemps.jour }).exec();


  
    if (!emploiData) {
      throw new Error('Emploi du temps introuvable.');
    }
  
    // Accès au module
    const module = await this.moduleModel.findById(emploiData.module).exec();
    if (!module) {
      throw new Error("Module introuvable.");
    }

    // Accès à l'enseignant (recherche explicite par ObjectId)
    const enseignant = await this.teacherModel.findById(module.teacher).exec();
    if (!enseignant) {
      throw new Error("Enseignant introuvable.");
    }

    // Récupération des salles disponibles
    const sallesDisponibles = await this.salleService.getSallesDisponibles(module);

    // Calcul des horaires disponibles
    const horairesDisponibles = await this.calculerHorairesDisponibles(module._id, enseignant._id);

    if (!horairesDisponibles.length) {
      throw new Error('Aucun créneau horaire disponible pour cet emploi du temps.');
    }

    const { jour, heureDebut, heureFin } = horairesDisponibles[0];
    const salle = sallesDisponibles[0];

    // Mise à jour des données de l'emploi du temps
    emploiData.jour = jour;
    emploiData.heureDebut = heureDebut;
    emploiData.heureFin = heureFin;
    emploiData.salle = salle;

    // Vérification des conflits d'horaires
    const conflit = await this.detecterConflit(emploiData);
    if (conflit) {
      throw new Error('Conflit d\'horaire détecté : ' + conflit);
    }

    // Sauvegarde des changements
    return emploiData.save();
  }
  

  

  private async calculerHorairesDisponibles(moduleId: Types.ObjectId, enseignant: Types.ObjectId) {
    const disponibilitesEnseignant = await this.getDisponibilitesEnseignant(enseignant);
    const disponibilitesSalles = await this.salleService.getDisponibilitesSalles(moduleId);

    return disponibilitesEnseignant.filter(ens =>
      disponibilitesSalles.some(salle => ens.jour === salle.jour && ens.heureDebut === salle.heureDebut)
    );
  }

  private async getDisponibilitesEnseignant(enseignantId: Types.ObjectId) {
    return this.emploiDuTempsModel.find({ 'module.teacher': enseignantId }, 'jour heureDebut heureFin').exec();
  }

  // Méthode pour détecter un conflit d'horaires et vérifier si l'heure de fin est après l'heure de début
  private async detecterConflit(emploiDuTemps: Partial<EmploiDuTemps>): Promise<string | null> {
    const { salle, jour, heureDebut, heureFin, user } = emploiDuTemps;

    // Validation que l'heure de fin est après l'heure de début
    const debut = new Date('1970-01-01T' + heureDebut + 'Z');
    const fin = new Date('1970-01-01T' + heureFin + 'Z');

    if (debut >= fin) {
      return 'L\'heure de fin doit être supérieure à l\'heure de début.';
    }

    // Vérification de l'utilisateur (si spécifié)
    if (!user || !Types.ObjectId.isValid(user)) {
      return "Utilisateur invalide.";
    }

    // Recherche de conflits dans la base de données
    const conflit = await this.emploiDuTempsModel.findOne({
      $or: [
        { user, jour, $or: [{ heureDebut: { $lt: heureFin }, heureFin: { $gt: heureDebut } }] },
        { salle, jour, $or: [{ heureDebut: { $lt: heureFin }, heureFin: { $gt: heureDebut } }] }
      ]
    }).exec();

    // Si un conflit est trouvé, retourner un message d'erreur
    return conflit ? "Conflit d'horaire détecté." : null;
  }

  async findAll(): Promise<EmploiDuTemps[]> {
    return this.emploiDuTempsModel.find().exec();
  }

  async findOne(id: string): Promise<EmploiDuTemps | null> {
    if (!Types.ObjectId.isValid(id)) throw new Error("ID invalide.");
    return this.emploiDuTempsModel.findById(id).exec();
  }

  async update(id: string, emploiDuTemps: Partial<EmploiDuTemps>): Promise<EmploiDuTemps | null> {
    if (!emploiDuTemps.module || !emploiDuTemps.jour) throw new Error("Module ou Jour manquants.");
  
    // Recherche l'emploi du temps par le module et le jour
    const updatedEmploiDuTemps = await this.emploiDuTempsModel.findOneAndUpdate(
      { module: emploiDuTemps.module, jour: emploiDuTemps.jour },
      emploiDuTemps,
      { new: true }
    ).exec();
  
    if (updatedEmploiDuTemps) await this.notifierChangementHoraire(updatedEmploiDuTemps);
  
    return updatedEmploiDuTemps;
  }
  

  async delete(id: string): Promise<EmploiDuTemps | null> {
    if (!Types.ObjectId.isValid(id)) throw new Error("ID invalide.");
    return this.emploiDuTempsModel.findByIdAndDelete(id).exec();
  }

  private async notifierChangementHoraire(emploiDuTemps: EmploiDuTemps): Promise<void> {
    if (!Types.ObjectId.isValid(emploiDuTemps.user)) return;
  
    const message = `Votre emploi du temps a été modifié : ${emploiDuTemps.jour} de ${emploiDuTemps.heureDebut} à ${emploiDuTemps.heureFin}.`;
    await this.notificationService.envoyerNotification(emploiDuTemps.user, 'Changement d\'horaire', message);
  }
  

  async filtrerEmploisDuTemps(filtre: any): Promise<EmploiDuTemps[]> {
    const query: any = {};

    if (filtre.departement) query['module.departement'] = new Types.ObjectId(filtre.departement);
    if (filtre.filiere) query['module.filiere'] = new Types.ObjectId(filtre.filiere);
    if (filtre.enseignant) query['module.teacher'] = new Types.ObjectId(filtre.enseignant); 

    return this.emploiDuTempsModel.find(query).exec();
  }
}