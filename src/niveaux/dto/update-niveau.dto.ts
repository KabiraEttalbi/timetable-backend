import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateNiveauDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  cycle?: number;
}
