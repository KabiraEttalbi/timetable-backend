import { IsString, IsNotEmpty, IsIn, IsOptional, IsDateString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateReservationDto {

  @IsNotEmpty()
  salle: Types.ObjectId;

  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsString()
  @IsNotEmpty()
  heureDebut: string;

  @IsString()
  @IsNotEmpty()
  title: string; 

  @IsString()
  @IsNotEmpty()
  description: string; 

  @IsString()
  @IsNotEmpty()
  heureFin: string;

  @IsNotEmpty()
  user: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  @IsIn(['event', 'course', 'td', 'tp']) // Validate the type field
  type: 'event' | 'course' | 'td' | 'tp';

  @IsOptional()
  module?: Types.ObjectId; 
}