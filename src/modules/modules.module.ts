import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Module as ModuleModel, ModuleSchema } from './models/module.model';
import { ModuleService } from './services/module/module.service';
import { ModuleController } from './controllers/module/module.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ModuleModel.name, schema: ModuleSchema }]), // Ajout du modèle
  ],
  providers: [ModuleService],
  controllers: [ModuleController],
  exports: [ModuleService], // Si utilisé dans un autre module
})
export class ModulesModule {}