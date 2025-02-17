import { IsString, IsInt, IsEnum, Min, IsMongoId, IsBoolean, IsOptional, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class CreateSalleDto {

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1) 
  capacite: number;

  @IsNotEmpty()
  @IsEnum(["amphi", "normal", "haull"]) // Limite les valeurs de type à ces trois
  type: string;

  @IsNotEmpty()
  @IsBoolean()
  disponible: boolean; // True si la salle est disponible, sinon False
}
