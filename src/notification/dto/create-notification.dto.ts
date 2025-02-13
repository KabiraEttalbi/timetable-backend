import { IsString, IsBoolean, IsDate, IsNotEmpty, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class CreateNotificationDto {
  @IsMongoId()  // Valide que userId est un ObjectId Mongo
  userId: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsBoolean()
  lue: boolean;

  @IsDate()
  date: Date;
}
