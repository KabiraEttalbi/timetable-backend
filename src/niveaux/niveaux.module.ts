import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Niveau, NiveauSchema } from './models/niveau.model';
import { NiveauService } from './services/niveau/niveau.service';
import { NiveauController } from './controllers/niveau/niveau.controller';
import { Option, OptionSchema } from 'src/options/models/option.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Niveau.name, schema: NiveauSchema }, { name: Option.name, schema: OptionSchema }]), // Ajout du modèle
  ],
  providers: [NiveauService],
  controllers: [NiveauController],
  exports: [NiveauService], // Si utilisé dans un autre module
})
export class NiveauxModule {}