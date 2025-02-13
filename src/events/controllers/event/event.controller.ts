import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { EventService } from '../../services/event/event.service';
import { Event } from '../../models/event.model';
import { CreateEventDto } from '../../dto/create-event.dto';
import { UpdateEventDto } from '../../dto/update-event.dto';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) { }

  @Post()
  async create(@Body() createEventDto: CreateEventDto): Promise<Event> {
    return this.eventService.create(createEventDto);
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
  async update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto): Promise<Event | null> {
    return this.eventService.update(id, updateEventDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Event | null> {
    return this.eventService.delete(id);
  }
}