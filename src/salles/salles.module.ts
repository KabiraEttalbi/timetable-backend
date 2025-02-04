import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Salle, SalleSchema } from './models/salle.model';
import { SalleService } from './services/salle/salle.service';
import { SalleController } from './controllers/salle/salle.controller';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Salle.name, schema: SalleSchema }]), // Ajout du modèle
  ],
  providers: [SalleService],
  controllers: [SalleController],
  exports: [SalleService], // Si utilisé dans un autre module
})
export class SallesModule {}