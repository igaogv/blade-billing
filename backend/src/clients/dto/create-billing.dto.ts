import { IsNotEmpty, IsNumber, IsString, IsEmail } from 'class-validator';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsNumber()
  @IsNotEmpty()
  monthlyValue: number;
}