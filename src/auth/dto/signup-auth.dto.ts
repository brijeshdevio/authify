import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';
export class SignUpAuthDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
