import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Teacher, TeacherSchema } from "./models/teacher.model";
import { User, UserSchema } from "src/users/models/user.model";
import { Departement, DepartementSchema } from "src/departements/models/departement.model";
import { TeacherController } from "./controllers/teacher/teacher.controller";
import { TeacherService } from "./services/teacher/teacher.service";
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Teacher.name, schema: TeacherSchema },
      { name: User.name, schema: UserSchema },
      { name: Departement.name, schema: DepartementSchema },
    ]),
  ],
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeachersModule {}
