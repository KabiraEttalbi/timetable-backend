import { IsString, IsOptional, IsNumber, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateModuleDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  nbhours?: number;

  @IsMongoId()
  @IsOptional()
  niveau?: Types.ObjectId;

  @IsMongoId()
  @IsOptional()
  option?: Types.ObjectId;

  @IsMongoId()
  @IsOptional()
  teacher?: Types.ObjectId;
}
