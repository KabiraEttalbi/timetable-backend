import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Salle, SalleSchema } from './models/salle.model';
import { SalleService } from './services/salle/salle.service';
import { SalleController } from './controllers/salle/salle.controller';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Salle.name, schema: SalleSchema }]), 
  ],
  providers: [SalleService],
  controllers: [SalleController],
  exports: [SalleService], 
})
export class SallesModule {}