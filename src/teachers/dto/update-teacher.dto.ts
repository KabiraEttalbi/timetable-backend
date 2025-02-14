import { IsString, IsArray, IsOptional, Matches, IsDateString } from 'class-validator';
import { Types } from 'mongoose';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

export class UpdateTeacherDto {
  @IsOptional()
  user?: UpdateUserDto;
  
  @IsOptional()
  department?: Types.ObjectId;

  @IsString()
  @IsOptional()
  gender?: string;

  @IsOptional()
  @IsString()
  @Matches(/^[A-Za-z]{1,2}\d{6}$/)
  cni?: string; 

  @IsOptional()
  @IsDateString()
  birthdate?: Date;
  
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