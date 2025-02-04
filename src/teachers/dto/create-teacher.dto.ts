import { IsString, IsNotEmpty, IsArray } from 'class-validator';
import { Types } from 'mongoose';

export class CreateTeacherDto {
  @IsNotEmpty()
  user: Types.ObjectId; // Reference to the User model

  @IsNotEmpty()
  department: Types.ObjectId; // Reference to the Departement model

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsArray()
  @IsNotEmpty()
  modules: Types.ObjectId[]; // Array of references to the Module model

  @IsString()
  @IsNotEmpty()
  image: string;
}