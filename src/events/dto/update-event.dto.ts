import { IsString, IsOptional, IsMongoId, IsDate, IsDateString } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateEventDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  @IsOptional()
  date?: Date;

  
  @IsOptional()
  @IsString()
  heureDebut?: string;
  
  @IsOptional()
  @IsString()
  heureFin?: string;
  

  @IsMongoId()
  @IsOptional()
  organizer?: Types.ObjectId;

  @IsMongoId()
  @IsOptional()
  reservation?: Types.ObjectId;
}
