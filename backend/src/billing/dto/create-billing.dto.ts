import { IsNotEmpty, IsNumber, IsString, IsDateString } from 'class-validator';

export class CreateBillingDto {
  @IsString()
  @IsNotEmpty()
  clientId: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsDateString()
  @IsNotEmpty()
  dueDate: string;
}