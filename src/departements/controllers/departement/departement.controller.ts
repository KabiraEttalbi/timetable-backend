import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { DepartementService } from '../../services/departement/departement.service';
import { CreateDepartementDto } from '../../dto/create-departement.dto';
import { UpdateDepartementDto } from '../../dto/update-departement.dto';

@Controller('departements')
export class DepartementController {
  constructor(private readonly departementService: DepartementService) {}

  @Post()
  async create(@Body() createDepartementDto: CreateDepartementDto) {
    return this.departementService.create(createDepartementDto);
  }

  @Get()
  async findAll() {
    return this.departementService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.departementService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDepartementDto: UpdateDepartementDto,
  ) {
    return this.departementService.update(id, updateDepartementDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.departementService.delete(id);
  }
}