import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ModuleService } from '../../services/module/module.service';
import { Module } from '../../models/module.model';

@Controller('module')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}

  @Post()
  async create(@Body() module: Module): Promise<Module> {
    return this.moduleService.create(module);
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
  async update(@Param('id') id: string, @Body() module: Module): Promise<Module | null> {
    return this.moduleService.update(id, module);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Module | null> {
    return this.moduleService.delete(id);
  }
}