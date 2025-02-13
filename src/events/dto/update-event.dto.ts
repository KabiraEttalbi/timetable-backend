import { IsString, IsOptional, IsMongoId, IsDate } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateEventDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDate()
  @IsOptional()
  date?: Date;

  @IsMongoId()
  @IsOptional()
  organizer?: Types.ObjectId;

  @IsMongoId()
  @IsOptional()
  reservation?: Types.ObjectId;
}
