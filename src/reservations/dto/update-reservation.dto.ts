import { IsString, IsOptional, IsIn, IsDateString } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateReservationDto {
  @IsOptional()
  salle?: Types.ObjectId;

  @IsDateString()
  @IsOptional()
  date?: Date;

  @IsString()
  @IsOptional()
  title?: string; 

  @IsString()
  @IsOptional()
  description?: string; 
  
  @IsString()
  @IsOptional()
  heureDebut?: string;

  @IsString()
  @IsOptional()
  heureFin?: string;

  @IsOptional()
  user?: Types.ObjectId;

  @IsString()
  @IsOptional()
  @IsIn(['event', 'course', 'td', 'tp']) // Validate the type field
  type?: 'event' | 'course' | 'td' | 'tp';

  @IsOptional()
  module?: Types.ObjectId; 

}