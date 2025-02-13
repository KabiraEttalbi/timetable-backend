import { IsEnum, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
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

  @IsNotEmpty()
  @IsMongoId()
  module: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  salle: Types.ObjectId;

  @IsNotEmpty()
  @IsEnum(ScheduleType)
  type: ScheduleType;

  @IsNotEmpty()
  @IsMongoId()
  user: Types.ObjectId;
}
