import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { SalleService } from '../../services/salle/salle.service';
import { Salle } from '../../models/salle.model';

@Controller('salle')
export class SalleController {
  constructor(private readonly salleService: SalleService) {}

  @Post()
  async create(@Body() salle: Salle): Promise<Salle> {
    return this.salleService.create(salle);
  }

  @Get()
  async findAll(): Promise<Salle[]> {
    return this.salleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Salle | null> {
    return this.salleService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() salle: Salle): Promise<Salle | null> {
    return this.salleService.update(id, salle);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Salle | null> {
    return this.salleService.delete(id);
  }
}