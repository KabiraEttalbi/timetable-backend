import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { Types } from 'mongoose';

export class CreateStudentDto {
  @IsNotEmpty()
  user: Types.ObjectId; // Reference to the User model

  @IsNotEmpty()
  niveau: Types.ObjectId;

  @IsNotEmpty()
  option: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsNumber()
  @IsNotEmpty()
  anneeBaccalaureat: number;

  @IsString()
  @IsNotEmpty()
  image: string;
}