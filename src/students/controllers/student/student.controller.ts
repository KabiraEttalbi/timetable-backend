import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
  } from '@nestjs/common';
  import { StudentService } from '../../services/student/student.service';
  import { CreateStudentDto } from '../../dto/create-student.dto';
  import { UpdateStudentDto } from '../../dto/update-student.dto';
  
  @Controller('students')
  export class StudentController {
    constructor(private readonly studentService: StudentService) {}
  
    @Post()
    async create(@Body() createStudentDto: CreateStudentDto) {
      return this.studentService.create(createStudentDto);
    }
  
    @Get()
    async findAll() {
      return this.studentService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string) {
      return this.studentService.findOne(id);
    }
  
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
      return this.studentService.update(id, updateStudentDto);
    }
  
    @Delete(':id')
    async delete(@Param('id') id: string) {
      return this.studentService.delete(id);
    }
  }