import { IsString, IsNotEmpty,IsArray, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';
export class CreateDepartementDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsMongoId({ each: true }) 
  teachers: Types.ObjectId[];

  @IsArray()
  @IsMongoId({ each: true }) 

  @IsArray()
  @IsMongoId({ each: true })
  niveaux: Types.ObjectId[];
}