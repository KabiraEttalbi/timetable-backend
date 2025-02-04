import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
  } from '@nestjs/common';
  import { UserService } from '../../services/user/user.service';
  import { User } from '../../models/user.model';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
  
  @Controller('users')
  export class UserController {
    constructor(private readonly userService: UserService) {}
  
    // Create a new user
    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  
    // Get all users
    @Get()
    async findAll(): Promise<User[]> {
      return this.userService.findAll();
    }
  
    // Get a user by ID
    @Get(':id')
    async findById(@Param('id') id: string): Promise<User | null> {
      return this.userService.findById(id);
    }
  
    // Update a user by ID
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
      return this.userService.update(id, updateUserDto);
    }
  
    // Delete a user by ID
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<User | null> {
      return this.userService.delete(id);
    }
  }