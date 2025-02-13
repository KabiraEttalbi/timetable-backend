import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateNiveauDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  cycle: number;
}
