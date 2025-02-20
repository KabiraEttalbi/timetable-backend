import { Controller, Get, Post, Body, Param, Put, Delete,ConflictException } from '@nestjs/common';
import { CreateEmploiDuTempsDto } from '../../dto/create-emploiDuTemps.dto';
import { UpdateEmploiDuTempsDto } from '../../dto/update-emploiDuTemps.dto';
import { EmploiDuTempsService } from '../../services/emploi-du-temps/emploi-du-temps.service';
import { EmploiDuTemps } from '../../models/emploiDuTemps.model';


@Controller('emploi-du-temps')
export class EmploiDuTempsController {
  constructor(private readonly emploiDuTempsService: EmploiDuTempsService) { }

  // @Post()
  // async create(@Body() createEmploiDuTempsDto: CreateEmploiDuTempsDto): Promise<EmploiDuTemps> {
  //   return this.emploiDuTempsService.create(createEmploiDuTempsDto);
  // }
  @Post()
  async create(@Body() createEmploiDuTempsDto: CreateEmploiDuTempsDto): Promise<EmploiDuTemps> {
    try {
      return await this.emploiDuTempsService.create(createEmploiDuTempsDto);
    } catch (error) {
      // Gestion de l'exception en cas de conflit
      throw new ConflictException(error.message);
    }
  }



  @Get()
  async findAll() {
    return this.emploiDuTempsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<EmploiDuTemps | null> {
    return this.emploiDuTempsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateEmploiDuTempsDto: UpdateEmploiDuTempsDto): Promise<EmploiDuTemps | null> {
    return this.emploiDuTempsService.update(id, updateEmploiDuTempsDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<EmploiDuTemps | null> {
    return this.emploiDuTempsService.remove(id);
  }
  @Get('student/:studentId')
  async getStudentSchedule(@Param('studentId') studentId: string) {
    return this.emploiDuTempsService.getScheduleByStudent(studentId);
  }

  // @Post('generate/:departementId')
  // async generateEmploiDuTemps(@Param('departementId') departementId: string): Promise<EmploiDuTemps[]> {
  //   return this.emploiDuTempsService.generateEmploiDuTemps(departementId);
  // }
}