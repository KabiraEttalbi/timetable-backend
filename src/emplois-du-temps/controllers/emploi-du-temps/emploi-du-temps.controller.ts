
import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common';
//import { EmploiDuTemps } from 'src/emplois-du-temps/models/emploiDuTemps.model';
import { EmploiDuTemps } from '../../models/emploiDuTemps.model';
import { EmploiDuTempsService } from '../../services/emploi-du-temps/emploi-du-temps.service';

@Controller('emploi-du-temps')
export class EmploiDuTempsController {
  constructor(private readonly emploiDuTempsService: EmploiDuTempsService) {}

  @Post()
  async create(@Body() emploiDuTemps: EmploiDuTemps): Promise<EmploiDuTemps> {
    return this.emploiDuTempsService.create(emploiDuTemps);
  }

  @Get()
  async findAll(): Promise<EmploiDuTemps[]> {
    return this.emploiDuTempsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<EmploiDuTemps> {
    const emploiDuTemps = await this.emploiDuTempsService.findOne(id);
    if (!emploiDuTemps) {
      throw new NotFoundException(`Emploi du temps avec l'ID ${id} non trouvé.`);
    }
    return emploiDuTemps;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() emploiDuTemps: EmploiDuTemps): Promise<EmploiDuTemps> {
    const updatedEmploiDuTemps = await this.emploiDuTempsService.update(id, emploiDuTemps);
    if (!updatedEmploiDuTemps) {
      throw new NotFoundException(`Impossible de mettre à jour : emploi du temps avec l'ID ${id} non trouvé.`);
    }
    return updatedEmploiDuTemps;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<EmploiDuTemps> {
    const deletedEmploiDuTemps = await this.emploiDuTempsService.delete(id);
    if (!deletedEmploiDuTemps) {
      throw new NotFoundException(`Impossible de supprimer : emploi du temps avec l'ID ${id} non trouvé.`);
    }
    return deletedEmploiDuTemps;
  }
  
}