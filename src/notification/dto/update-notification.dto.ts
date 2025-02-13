import { IsString, IsBoolean, IsDate, IsOptional, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateNotificationDto {
  @IsMongoId()  // Valide que userId est un ObjectId Mongo
  @IsOptional()
  userId?: Types.ObjectId;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  message?: string;

  @IsBoolean()
  @IsOptional()
  lue?: boolean;

  @IsDate()
  @IsOptional()
  date?: Date;
}
