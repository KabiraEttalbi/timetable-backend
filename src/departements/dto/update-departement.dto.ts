import { IsString, IsOptional } from 'class-validator';

export class UpdateDepartementDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;
}