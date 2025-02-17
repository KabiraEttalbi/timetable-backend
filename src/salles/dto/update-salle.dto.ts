import { IsString, IsNumber, IsEnum, IsOptional, IsMongoId, IsBoolean } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateSalleDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  capacite?: number;

  @IsOptional()
  @IsEnum(["amphi", "normal", "haull"])
  type?: string;

  @IsOptional()
  @IsBoolean()
  disponible?: boolean;
}
