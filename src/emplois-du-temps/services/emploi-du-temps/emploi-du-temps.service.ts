import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateEmploiDuTempsDto } from '../../dto/create-emploiDuTemps.dto';
import { UpdateEmploiDuTempsDto } from '../../dto/update-emploiDuTemps.dto';
import { EmploiDuTemps, EmploiDuTempsDocument } from '../../models/emploiDuTemps.model';
import { SalleService } from '../../../salles/services/salle/salle.service';
import { NotificationService } from '../../../notification/services/notification.service';
import { Module } from '../../../modules/models/module.model';
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

  // création
  async createAutomatique(createEmploiDuTempsDto: CreateEmploiDuTempsDto): Promise<EmploiDuTemps> {
    if (!createEmploiDuTempsDto.module) {
      throw new Error("Module non spécifié.");
    }

    // Récupération de l'emploi du temps
    const emploiData = await this.emploiDuTempsModel.findOne({ module: createEmploiDuTempsDto.module, jour: createEmploiDuTempsDto.jour }).exec();

    if (!emploiData) {
      throw new Error('Emploi du temps introuvable.');
    }

    const module = await this.moduleModel.findById(emploiData.module).exec();
    if (!module) {
      throw new Error("Module introuvable.");
    }

    const enseignant = await this.teacherModel.findById(module.teacher).exec();
    if (!enseignant) {
      throw new Error("Enseignant introuvable.");
    }

    // Définir une capacité minimale et un type de salle par défaut
    const capaciteMin = 30; // Par exemple, une capacité minimale de 30
    const typeSalle = 'normal'; // Par exemple, une salle de type "normal"

    const sallesDisponibles = await this.salleService.getDisponibilitesSalles(module._id, capaciteMin, typeSalle); // Ajout des paramètres
    
    const horairesDisponibles = await this.calculerHorairesDisponibles(module._id, enseignant._id);

    if (!horairesDisponibles.length) {
      throw new Error('Aucun créneau horaire disponible pour cet emploi du temps.');
    }

    const { jour, heureDebut, heureFin } = horairesDisponibles[0];
    const salle = sallesDisponibles[0];
    

    emploiData.jour = jour;
    emploiData.heureDebut = heureDebut;
    emploiData.heureFin = heureFin;
    

    

    const conflit = await this.detecterConflit(emploiData);
    if (conflit) {
      throw new Error('Conflit d\'horaire détecté : ' + conflit);
    }

    return emploiData.save();
  }

  // update
  async update(id: string, updateEmploiDuTempsDto: UpdateEmploiDuTempsDto): Promise<EmploiDuTemps | null> {
    if (!updateEmploiDuTempsDto.module || !updateEmploiDuTempsDto.jour) throw new Error("Module ou Jour manquants.");

    const updatedEmploiDuTemps = await this.emploiDuTempsModel.findOneAndUpdate(
      { module: updateEmploiDuTempsDto.module, jour: updateEmploiDuTempsDto.jour },
      updateEmploiDuTempsDto,
      { new: true }
    ).exec();

    if (updatedEmploiDuTemps) await this.notifierChangementHoraire(updatedEmploiDuTemps);

    return updatedEmploiDuTemps;
  }

  private async calculerHorairesDisponibles(moduleId: Types.ObjectId, enseignant: Types.ObjectId) {
    const disponibilitesEnseignant = await this.getDisponibilitesEnseignant(enseignant);
    const capaciteMin = 30; // Filtrer par capacité minimale
    const typeSalle = 'normal'; // Filtrer par type de salle
    const disponibilitesSalles = await this.salleService.getDisponibilitesSalles(moduleId, capaciteMin, typeSalle);  // Récupère les salles et leurs horaires

    return disponibilitesEnseignant.filter(ens =>
      disponibilitesSalles.some(salle =>
        salle.module?.equals(ens.module) // Comparaison du module de la salle avec celui de l'enseignant
      )
    );
    
    
  }

  private async getDisponibilitesEnseignant(enseignantId: Types.ObjectId) {
    return this.emploiDuTempsModel.find({ 'module.teacher': enseignantId }, 'jour heureDebut heureFin').exec();
  }

  private async detecterConflit(emploiDuTemps: Partial<EmploiDuTemps>): Promise<string | null> {
    const { salle, jour, heureDebut, heureFin, user } = emploiDuTemps;

    const debut = new Date('1970-01-01T' + heureDebut + 'Z');
    const fin = new Date('1970-01-01T' + heureFin + 'Z');

    if (debut >= fin) {
      return 'L\'heure de fin doit être supérieure à l\'heure de début.';
    }

    if (!user || !Types.ObjectId.isValid(user)) {
      return "Utilisateur invalide.";
    }

    const conflit = await this.emploiDuTempsModel.findOne({
      $or: [
        { user, jour, $or: [{ heureDebut: { $lt: heureFin }, heureFin: { $gt: heureDebut } }] },
        { salle, jour, $or: [{ heureDebut: { $lt: heureFin }, heureFin: { $gt: heureDebut } }] }
      ]
    }).exec();

    return conflit ? "Conflit d'horaire détecté." : null;
  }

  async findAll(): Promise<EmploiDuTemps[]> {
    return this.emploiDuTempsModel.find().exec();
  }

  async findOne(id: string): Promise<EmploiDuTemps | null> {
    if (!Types.ObjectId.isValid(id)) throw new Error("ID invalide.");
    return this.emploiDuTempsModel.findById(id).exec();
  }

  async delete(id: string): Promise<EmploiDuTemps | null> {
    if (!Types.ObjectId.isValid(id)) throw new Error("ID invalide.");
    return this.emploiDuTempsModel.findByIdAndDelete(id).exec();
  }

  private async notifierChangementHoraire(emploiDuTemps: EmploiDuTemps): Promise<void> {
    if (!Types.ObjectId.isValid(emploiDuTemps.user)) return;

    const message = `Votre emploi du temps a été modifié : ${emploiDuTemps.jour} de ${emploiDuTemps.heureDebut} à ${emploiDuTemps.heureFin}.`;
    await this.notificationService.envoyerNotification({
      userId: emploiDuTemps.user,
      title: "Changement d\'horaire",
      message,
      lue: false, 
      date: new Date() 
    });
  }

  async filtrerEmploisDuTemps(filtre: any): Promise<EmploiDuTemps[]> {
    const query: any = {};

    if (filtre.departement) query['module.departement'] = new Types.ObjectId(filtre.departement);
    if (filtre.filiere) query['module.filiere'] = new Types.ObjectId(filtre.filiere);
    if (filtre.enseignant) query['module.teacher'] = new Types.ObjectId(filtre.enseignant);

    return this.emploiDuTempsModel.find(query).exec();
  }
}
