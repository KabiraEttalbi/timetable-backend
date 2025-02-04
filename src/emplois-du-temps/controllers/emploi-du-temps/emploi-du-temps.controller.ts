import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException, BadRequestException, Query } from '@nestjs/common';
import { EmploiDuTemps } from '../../models/emploiDuTemps.model';
import { EmploiDuTempsService } from '../../services/emploi-du-temps/emploi-du-temps.service';

@Controller('emploi-du-temps')
export class EmploiDuTempsController {
  constructor(private readonly emploiDuTempsService: EmploiDuTempsService) {}

  // Route pour créer un emploi du temps automatiquement
  @Post('create')
  async create(@Body() emploiDuTemps: EmploiDuTemps): Promise<EmploiDuTemps> {
    const { heureDebut, heureFin } = emploiDuTemps;
  
    // Vérification que l'heure de fin est bien après l'heure de début
    if (new Date('1970-01-01T' + heureDebut + 'Z') >= new Date('1970-01-01T' + heureFin + 'Z')) {
      throw new BadRequestException('L\'heure de fin doit être supérieure à l\'heure de début.');
    }
  
    try {
      return await this.emploiDuTempsService.createAutomatique(emploiDuTemps);
    } catch (error) {
      throw new BadRequestException('Erreur lors de la création de l\'emploi du temps');
    }
  }
  @Get()
  async findAll(@Query() filtre: any): Promise<EmploiDuTemps[]> {
    if (Object.keys(filtre).length > 0) {
      return this.emploiDuTempsService.filtrerEmploisDuTemps(filtre);
    }
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
    // Si vous utilisez un autre critère pour l'update, vous pouvez ajuster la recherche.
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

  @Get('filter')
  async filter(@Query() query: any): Promise<EmploiDuTemps[]> {
    // Gestion des erreurs de filtre si nécessaire
    try {
      return this.emploiDuTempsService.filtrerEmploisDuTemps(query);
    } catch (error) {
      throw new BadRequestException('Erreur lors de l\'application du filtre');
    }
  }
}
