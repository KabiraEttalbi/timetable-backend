import { IsString, IsNotEmpty, IsArray, Matches, IsDateString } from 'class-validator';
import { Types } from 'mongoose';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class CreateTeacherDto {
  @IsNotEmpty()
  user: CreateUserDto; // Reference to the User model

  @IsNotEmpty()
  department: Types.ObjectId; // Reference to the Departement model

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Za-z]{1,2}\d{6}$/)
  cni: string; 
  
  @IsNotEmpty()
  @IsDateString()
  birthdate: Date;

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