import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ModuleService } from '../../services/module/module.service';
import { Module } from '../../models/module.model';
import { CreateModuleDto } from '../../dto/create-module.dto';
import { UpdateModuleDto } from '../../dto/update-module.dto';

@Controller('module')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}

  @Post()
  async create(@Body() createModuleDto: CreateModuleDto): Promise<Module> {
    return this.moduleService.create(createModuleDto);
  }

  @Get()
  async findAll(): Promise<Module[]> {
    return this.moduleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Module | null> {
    return this.moduleService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateModuleDto: UpdateModuleDto): Promise<Module | null> {
    return this.moduleService.update(id, updateModuleDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Module | null> {
    return this.moduleService.delete(id);
  }
}