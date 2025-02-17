import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { SalleService } from '../../services/salle/salle.service';
import { Salle } from '../../models/salle.model';
import { CreateSalleDto } from '../../dto/create-salle.dto';
import { UpdateSalleDto } from '../../dto/update-salle.dto';
import { Types } from 'mongoose';  

@Controller('salle')
export class SalleController {
  constructor(private readonly salleService: SalleService) {}

  @Post()
  async create(@Body() createSalleDto: CreateSalleDto): Promise<Salle> {
    return this.salleService.create(createSalleDto);
  }

  @Get()
  async findAll(): Promise<Salle[]> {
    return this.salleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Salle | null> {
    return this.salleService.findOne(id);
  }
//   @Get('disponibles/:moduleId')
//   async getSallesDisponibles(
//     @Param('moduleId') moduleId: string,  // Récupérer l'ID du module depuis l'URL
//   ) {
//     // Convertir l'ID du module en ObjectId
//     const moduleIdObject = new Types.ObjectId(moduleId);
    
//     // Appel de la méthode getDisponibilitesSalles avec les arguments nécessaires
// const salles = await this.salleService.getDisponibilitesSalles(moduleIdObject, 30, 'normal');

// return salles;
//   }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateSalleDto: UpdateSalleDto): Promise<Salle | null> {
    return this.salleService.update(id, updateSalleDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Salle | null> {
    return this.salleService.delete(id);
  }
}