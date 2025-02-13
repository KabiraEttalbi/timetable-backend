import { IsMongoId, IsNotEmpty, IsString, IsDateString, IsOptional } from 'class-validator';

export class UpdateReservationDto {
  @IsMongoId()
  @IsOptional() 
  salle?: string; 

  @IsDateString()
  @IsOptional() 
  date?: string; 

  @IsString()
  @IsOptional() 
  heureDebut?: string; 

  @IsString()
  @IsOptional() 
  heureFin?: string; 

  @IsMongoId()
  @IsOptional() 
  utilisateur?: string; 
}
