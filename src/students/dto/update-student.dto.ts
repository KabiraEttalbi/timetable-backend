import { IsString, IsNumber, IsOptional, Matches, IsDateString } from 'class-validator';
import { Types } from 'mongoose';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

export class UpdateStudentDto {
  @IsOptional()
  user?: UpdateUserDto;

  @IsOptional()
  niveau?: Types.ObjectId;

  @IsOptional()
  option?: Types.ObjectId;

  @IsOptional()
  @IsString()
  @Matches(/^[A-Za-z]\d{9}$/)    
  cne?: string;
    
  @IsOptional()
  @IsString()
  @Matches(/^[A-Za-z]{1,2}\d{6}$/)
  cni?: string; 

  @IsOptional()
  @IsDateString()
  birthdate?: Date;
  
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