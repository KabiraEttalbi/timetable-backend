import { IsString, IsNotEmpty, IsMongoId, IsDate } from 'class-validator';
import { Types } from 'mongoose';

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsMongoId()
  organizer: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  reservation: Types.ObjectId;
}
