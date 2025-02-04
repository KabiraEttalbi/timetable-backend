import { IsString, IsNumber, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateStudentDto {
  @IsOptional()
  user?: Types.ObjectId;

  @IsOptional()
  niveau?: Types.ObjectId;

  @IsOptional()
  option?: Types.ObjectId;

  @IsString()
  @IsOptional()
  gender?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsNumber()
  @IsOptional()
  anneeBaccalaureat?: number;

  @IsString()
  @IsOptional()
  image?: string;
}