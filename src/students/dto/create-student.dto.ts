import { IsString, IsNotEmpty, IsNumber, Matches } from 'class-validator';
import { Types } from 'mongoose';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class CreateStudentDto {
  @IsNotEmpty()
  user: CreateUserDto; // Reference to the User model

  @IsNotEmpty()
  niveau: Types.ObjectId;

  @IsNotEmpty()
  option: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Za-z]\d{9}$/)
  cne: string;
  
  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Za-z]{1,2}\d{6}$/)
  cni: string; 

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