import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { NiveauService } from '../../services/niveau/niveau.service';
import { Niveau } from '../../models/niveau.model';
import { CreateNiveauDto } from '../../dto/create-niveau.dto';
import { UpdateNiveauDto } from '../../dto/update-niveau.dto';

@Controller('niveau')
export class NiveauController {
  constructor(private readonly niveauService: NiveauService) {}

  @Post()
  async create(@Body() createNiveauDto: CreateNiveauDto): Promise<Niveau> {
    return this.niveauService.create(createNiveauDto);
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
  async update(@Param('id') id: string, @Body() updateNiveauDto: UpdateNiveauDto): Promise<Niveau | null> {
    return this.niveauService.update(id, updateNiveauDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Niveau | null> {
    return this.niveauService.delete(id);
  }
}