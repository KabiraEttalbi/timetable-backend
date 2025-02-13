import { IsString, IsArray, IsOptional } from 'class-validator';
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