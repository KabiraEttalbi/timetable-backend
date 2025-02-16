import { IsString, IsNotEmpty,IsArray, IsMongoId, IsOptional } from 'class-validator';
import { Types } from 'mongoose';
export class CreateDepartementDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true }) 
  teachers?: Types.ObjectId[];

  @IsArray()
  @IsMongoId({ each: true }) 
  @IsOptional()
  options?: Types.ObjectId[];

}