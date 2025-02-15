import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
    UploadedFile,
    UseInterceptors,
  } from '@nestjs/common';
  import { StudentService } from '../../services/student/student.service';
  import { CreateStudentDto } from '../../dto/create-student.dto';
  import { UpdateStudentDto } from '../../dto/update-student.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { Express } from 'express'; 
  
  @Controller('students')
  export class StudentController {
    constructor(private readonly studentService: StudentService) {}
  
    @Post()
    @UseInterceptors(FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }))
    async create(@Body() createStudentDto: CreateStudentDto, @UploadedFile() file: Express.Multer.File) {
      if (file) {
        createStudentDto.image = `/uploads/${file.filename}`;
      }
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