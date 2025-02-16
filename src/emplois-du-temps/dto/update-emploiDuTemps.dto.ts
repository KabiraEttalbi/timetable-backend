import { IsString, IsEnum, IsOptional, IsMongoId } from 'class-validator';
import { ScheduleType } from "../models/emploiDuTemps.model";
import { Types } from 'mongoose';

export class UpdateEmploiDuTempsDto {
  @IsString()
  @IsOptional()
  jour?: string;

  @IsString()
  @IsOptional()
  heureDebut?: string;

  @IsString()
  @IsOptional()
  heureFin?: string;

  @IsOptional()
  module?: Types.ObjectId;

  @IsOptional()
  salle?: Types.ObjectId;

  @IsEnum(ScheduleType)
  @IsOptional()
  type?: ScheduleType;

  @IsOptional()
  user?: Types.ObjectId;
}
