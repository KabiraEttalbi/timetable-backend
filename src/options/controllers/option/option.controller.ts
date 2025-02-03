import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
    NotFoundException,
  } from '@nestjs/common';
import { CreateOptionDto } from 'src/options/dto/create-option.dto';
import { UpdateOptionDto } from 'src/options/dto/update-option.dto';
import { OptionService } from 'src/options/services/option/option.service';
  
  @Controller('options')
  export class OptionController {
    constructor(private readonly optionService: OptionService) {}
  
    @Post()
    async create(@Body() createOptionDto: CreateOptionDto) {
      return this.optionService.create(createOptionDto);
    }
  
    @Get()
    async findAll() {
      return this.optionService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string) {
      const option = await this.optionService.findOne(id);
      if (!option) {
        throw new NotFoundException('Option not found');
      }
      return option;
    }
  
    @Put(':id')
    async update(
      @Param('id') id: string,
      @Body() updateOptionDto: UpdateOptionDto,
    ) {
      return this.optionService.update(id, updateOptionDto);
    }
  
    @Delete(':id')
    async delete(@Param('id') id: string) {
      return this.optionService.delete(id);
    }
  }