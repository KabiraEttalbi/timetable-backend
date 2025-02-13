import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Teacher, TeacherSchema } from "./models/teacher.model";
import { User, UserSchema } from "src/users/models/user.model";
import { Departement, DepartementSchema } from "src/departements/models/departement.model";
import { TeacherController } from "./controllers/teacher/teacher.controller";
import { TeacherService } from "./services/teacher/teacher.service";
import { UserService } from "src/users/services/user/user.service";
import { Module as ModuleModel, ModuleSchema } from "src/modules/models/module.model";
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Teacher.name, schema: TeacherSchema },
      { name: User.name, schema: UserSchema },
      { name: Departement.name, schema: DepartementSchema },
      { name: ModuleModel.name, schema: ModuleSchema },
    ]),
  ],
  controllers: [TeacherController],
  providers: [TeacherService, UserService],
})
export class TeachersModule {}
