import { IsString, IsOptional, IsArray, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';


export class UpdateDepartementDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsMongoId({ each: true }) 
  @IsOptional()
  teachers?: Types.ObjectId[];

  @IsArray()
  @IsMongoId({ each: true }) 
  @IsOptional()
  modules?: Types.ObjectId[];

  @IsArray()
  @IsMongoId({ each: true }) 
  @IsOptional()
  niveaux?: Types.ObjectId[];
}