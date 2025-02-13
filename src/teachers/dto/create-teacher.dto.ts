import { IsString, IsNotEmpty, IsArray } from 'class-validator';
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