import { IsString, IsOptional, IsNumber } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateNiveauDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  cycle?: string;

  @IsOptional()
  option?: Types.ObjectId;
}