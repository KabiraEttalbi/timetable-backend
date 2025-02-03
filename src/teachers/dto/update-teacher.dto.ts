import { IsString, IsArray, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateTeacherDto {
  @IsOptional()
  department?: Types.ObjectId;

  @IsString()
  @IsOptional()
  gender?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsArray()
  @IsOptional()
  modules?: Types.ObjectId[];

  @IsString()
  @IsOptional()
  image?: string;
}