import { IsString, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class CreateOptionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  duration: string;

  @IsNotEmpty()
  departement: Types.ObjectId; // Reference to the Department model
}