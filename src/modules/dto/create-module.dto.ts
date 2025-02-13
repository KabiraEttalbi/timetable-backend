import { IsString, IsNotEmpty, IsNumber, IsMongoId } from 'class-validator';
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

  @IsMongoId()
  teacher?: Types.ObjectId; // Optional field
}
