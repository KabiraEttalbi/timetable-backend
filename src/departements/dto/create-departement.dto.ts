import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDepartementDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}