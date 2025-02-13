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

  @IsMongoId()
  @IsOptional()
  module?: Types.ObjectId;

  @IsMongoId()
  @IsOptional()
  salle?: Types.ObjectId;

  @IsEnum(ScheduleType)
  @IsOptional()
  type?: ScheduleType;

  @IsMongoId()
  @IsOptional()
  user?: Types.ObjectId;
}
