import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CreateEmploiDuTempsDto } from '../../dto/create-emploiDuTemps.dto';
import { UpdateEmploiDuTempsDto } from '../../dto/update-emploiDuTemps.dto';
import { EmploiDuTempsService } from '../../services/emploi-du-temps/emploi-du-temps.service';


@Controller('emploi-du-temps')
export class EmploiDuTempsController {
  constructor(private readonly emploiDuTempsService: EmploiDuTempsService) {}

  @Post()
  async create(@Body() createEmploiDuTempsDto: CreateEmploiDuTempsDto) {
    return this.emploiDuTempsService.create(createEmploiDuTempsDto);
  }

  @Get()
  async findAll() {
    return this.emploiDuTempsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.emploiDuTempsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateEmploiDuTempsDto: UpdateEmploiDuTempsDto) {
    return this.emploiDuTempsService.update(id, updateEmploiDuTempsDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.emploiDuTempsService.remove(id);
  }
}