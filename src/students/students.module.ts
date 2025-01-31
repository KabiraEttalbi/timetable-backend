import { Module } from "@nestjs/common";
import { StudentController } from './controllers/student/student.controller';
@Module({
  controllers: [StudentController]
})
export class StudentsModule {}
