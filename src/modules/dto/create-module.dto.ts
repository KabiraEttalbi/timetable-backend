import { IsString, IsNotEmpty, IsNumber, IsMongoId, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class CreateModuleDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  nbhours: number;

  @IsNotEmpty()
  @IsMongoId()
  niveau: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  option: Types.ObjectId;

  @IsOptional()
  @IsMongoId()
  teacher?: Types.ObjectId; 
}
