import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { EventService } from '../../services/event/event.service';
import { Event } from '../../models/event.model';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  async create(@Body() event: Event): Promise<Event> {
    return this.eventService.create(event);
  }

  @Get()
  async findAll(): Promise<Event[]> {
    return this.eventService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Event | null> {
    return this.eventService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() event: Event): Promise<Event | null> {
    return this.eventService.update(id, event);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Event | null> {
    return this.eventService.delete(id);
  }
}