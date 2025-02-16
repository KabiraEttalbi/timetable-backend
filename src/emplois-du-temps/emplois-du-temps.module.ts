import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ModulesModule } from '../modules/modules.module'; 
import { Module as ModuleModel, ModuleSchema } from '../modules/models/module.model';
import { EmploiDuTemps, EmploiDuTempsSchema } from './models/emploiDuTemps.model';
import { Teacher, TeacherSchema } from '../teachers/models/teacher.model';
import { EmploiDuTempsService } from './services/emploi-du-temps/emploi-du-temps.service';
import { Salle, SalleSchema } from '../salles/models/salle.model'; 
import { SalleService } from '../salles/services/salle/salle.service'
import { NotificationService } from '../notification/services/notification.service';
import { EmploiDuTempsController } from './controllers/emploi-du-temps/emploi-du-temps.controller';
import { Notification, NotificationSchema } from 'src/notification/models/notification.model';
import { DepartementsModule } from '../departements/departements.module';
import { User, UserSchema } from 'src/users/models/user.model';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EmploiDuTemps.name, schema: EmploiDuTempsSchema },
      { name: Teacher.name, schema: TeacherSchema },
      { name: Notification.name, schema: NotificationSchema }, 
      { name: ModuleModel.name, schema: ModuleSchema }, 
      { name: Salle.name, schema: SalleSchema }, 
      { name: User.name, schema: UserSchema }, 
    ]),
    ModulesModule, 
    DepartementsModule,
  ],
  providers: [EmploiDuTempsService, SalleService, NotificationService],
  controllers: [EmploiDuTempsController],
})
export class EmploisDuTempsModule {}
