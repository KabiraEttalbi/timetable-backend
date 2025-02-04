import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ModulesModule } from '../modules/modules.module'; 
import { Module as ModuleModel, ModuleSchema } from '../modules/models/module.model';
import { EmploiDuTemps, EmploiDuTempsSchema } from './models/emploiDuTemps.model';
import { Teacher, TeacherSchema } from 'src/teachers/models/teacher.model';
import { EmploiDuTempsService } from './services/emploi-du-temps/emploi-du-temps.service';
import { Salle, SalleSchema } from 'src/salles/models/salle.model'; 
import { SalleService } from 'src/salles/services/salle/salle.service';
import { NotificationService } from 'src/notification/services/notification.service';
import { EmploiDuTempsController } from './controllers/emploi-du-temps/emploi-du-temps.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EmploiDuTemps.name, schema: EmploiDuTempsSchema },
      { name: Teacher.name, schema: TeacherSchema },
      { name: ModuleModel.name, schema: ModuleSchema }, // 🔥 Ajout du modèle Module
      { name: Salle.name, schema: SalleSchema }, // 🔥 Ajout du modèle Salle
    ]),
    ModulesModule, 
  ],
  providers: [EmploiDuTempsService, SalleService, NotificationService],
  controllers: [EmploiDuTempsController],
})
export class EmploisDuTempsModule {}
