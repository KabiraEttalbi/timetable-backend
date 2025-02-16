import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Module as ModuleModel, ModuleSchema } from './models/module.model';
import { ModuleService } from './services/module/module.service';
import { ModuleController } from './controllers/module/module.controller';
import { Teacher, TeacherSchema } from 'src/teachers/models/teacher.model';
import { OptionSchema, Option } from 'src/options/models/option.model';
import { Niveau, NiveauSchema } from 'src/niveaux/models/niveau.model';
import { User, UserSchema } from 'src/users/models/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ModuleModel.name, schema: ModuleSchema },
      { name: Teacher.name, schema: TeacherSchema },
      { name: Option.name, schema: OptionSchema },
      { name: User.name, schema: UserSchema },
      { name: Niveau.name, schema: NiveauSchema }
    ]), // Ajout du modèle
  ],
  providers: [ModuleService],
  controllers: [ModuleController],
  exports: [ModuleService], // Si utilisé dans un autre module
})
export class ModulesModule {} 