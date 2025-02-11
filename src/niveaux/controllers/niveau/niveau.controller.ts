import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { NiveauService } from '../../services/niveau/niveau.service';
import { Niveau } from '../../models/niveau.model';

@Controller('niveau')
export class NiveauController {
  constructor(private readonly niveauService: NiveauService) {}

  @Post()
  async create(@Body() niveau: Niveau): Promise<Niveau> {
    return this.niveauService.create(niveau);
  }

  @Get()
  async findAll(): Promise<Niveau[]> {
    return this.niveauService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Niveau | null> {
    return this.niveauService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() niveau: Niveau): Promise<Niveau | null> {
    return this.niveauService.update(id, niveau);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Niveau | null> {
    return this.niveauService.delete(id);
  }
}