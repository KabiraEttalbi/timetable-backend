import { IsString, IsEmail, MinLength, Matches, IsIn } from 'class-validator';

export class CreateUserDto {
  @IsString()
  nom: string;

  @IsString()
  prenom: string;

  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsString()
  @MinLength(8)
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/)
  password: string;

  @IsString()
  @IsIn(['admin', 'enseignant', 'etudiant']) // Ensure role is one of these values
  role: 'admin' | 'enseignant' | 'etudiant';
}