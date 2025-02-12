import { IsString, IsNumber, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateOptionDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  duration?: string;

  @IsOptional()
  departement?: Types.ObjectId;
}