import { IsString, IsNotEmpty, IsMongoId, IsDate, IsDateString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  @IsString()
  heureDebut: string;

  @IsNotEmpty()
  @IsString()
  heureFin: string;

  @IsNotEmpty()
  @IsMongoId()
  organizer: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  reservation: Types.ObjectId;
} 