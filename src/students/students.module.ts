import { Module } from "@nestjs/common";
import { StudentController } from './controllers/student/student.controller';
import { StudentService } from "./services/student/student.service";
import { Student, StudentSchema } from "./models/student.model";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/users/models/user.model";
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Student.name, schema: StudentSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentsModule {}
