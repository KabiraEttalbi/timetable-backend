import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { Types } from 'mongoose';

export class CreateOptionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @IsNotEmpty()
  department: Types.ObjectId; // Reference to the Department model
}