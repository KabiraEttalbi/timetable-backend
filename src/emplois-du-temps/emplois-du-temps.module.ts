import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EmploiDuTempsService } from './services/emploi-du-temps/emploi-du-temps.service';
import { EmploiDuTempsController } from './controllers/emploi-du-temps/emploi-du-temps.controller';
import { EmploiDuTemps, EmploiDuTempsSchema } from './models/emploiDuTemps.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: EmploiDuTemps.name, schema: EmploiDuTempsSchema }]), // Ajout du modèle
  ],
  providers: [EmploiDuTempsService],
  controllers: [EmploiDuTempsController],
  exports: [EmploiDuTempsService], // Si utilisé dans un autre module
})
export class EmploisDuTempsModule {}