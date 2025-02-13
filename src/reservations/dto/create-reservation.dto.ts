import { IsMongoId, IsNotEmpty, IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateReservationDto {
  @IsMongoId()
  @IsNotEmpty()
  salle: string;

  @IsDateString()
  @IsNotEmpty()
  date: string; 

  @IsString()
  @IsNotEmpty()
  heureDebut: string; 

  @IsString()
  @IsNotEmpty()
  heureFin: string; 
  
  @IsMongoId()
  @IsNotEmpty()
  utilisateur: string; 
}
