import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
    NotFoundException,
  } from '@nestjs/common';
import { CreateTeacherDto } from 'src/teachers/dto/create-teacher.dto';
import { UpdateTeacherDto } from 'src/teachers/dto/update-teacher.dto';
import { TeacherService } from 'src/teachers/services/teacher/teacher.service';
  
  @Controller('teachers')
  export class TeacherController {
    constructor(private readonly teacherService: TeacherService) {}
  
    @Post()
    async create(@Body() createTeacherDto: CreateTeacherDto) {
      return this.teacherService.create(createTeacherDto);
    }
  
    @Get()
    async findAll() {
      return this.teacherService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string) {
      const teacher = await this.teacherService.findOne(id);
      if (!teacher) {
        throw new NotFoundException('Teacher not found');
      }
      return teacher;
    }
  
    @Put(':id')
    async update(
      @Param('id') id: string,
      @Body() updateTeacherDto: UpdateTeacherDto,
    ) {
      return this.teacherService.update(id, updateTeacherDto);
    }
  
    @Delete(':id')
    async delete(@Param('id') id: string) {
      return this.teacherService.delete(id);
    }
  }