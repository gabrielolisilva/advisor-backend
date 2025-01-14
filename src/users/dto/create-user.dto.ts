import { IsNotEmpty, IsString, IsOptional, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  profile_picture?: string;

  @IsNotEmpty()
  @IsString()
  role: string;
}
