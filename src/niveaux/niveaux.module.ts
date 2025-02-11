import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Niveau, NiveauSchema } from './models/niveau.model';
import { NiveauService } from './services/niveau/niveau.service';
import { NiveauController } from './controllers/niveau/niveau.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Niveau.name, schema: NiveauSchema }]), // Ajout du modèle
  ],
  providers: [NiveauService],
  controllers: [NiveauController],
  exports: [NiveauService], // Si utilisé dans un autre module
})
export class NiveauxModule {}