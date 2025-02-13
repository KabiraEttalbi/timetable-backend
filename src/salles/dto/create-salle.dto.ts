import { IsString, IsInt, IsEnum, Min, IsMongoId, IsBoolean } from 'class-validator';
import { Types } from 'mongoose';

export class CreateSalleDto {
  @IsString()
  name: string;

  @IsInt()
  @Min(1) 
  capacite: number;

  @IsEnum(["amphi", "normal", "haull"]) // Limite les valeurs de type à ces trois
  type: string;

  @IsMongoId()
  module: Types.ObjectId; // ID du module lié à la salle

  @IsBoolean()
  disponible: boolean; // True si la salle est disponible, sinon False
}
