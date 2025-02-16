import { IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { ScheduleType } from '../models/emploiDuTemps.model';

export class CreateEmploiDuTempsDto {
  @IsNotEmpty()
  @IsString()
  jour: string;

  @IsNotEmpty()
  @IsString()
  heureDebut: string;

  @IsNotEmpty()
  @IsString()
  heureFin: string;

  @IsOptional()
  module: Types.ObjectId;

  @IsNotEmpty()
  salle: Types.ObjectId;

  @IsNotEmpty()
  @IsEnum(ScheduleType)
  type: ScheduleType;

  @IsNotEmpty()
  user: Types.ObjectId;
}

