import { IsEmail, IsIn, IsNumber } from 'class-validator';

export class CalculatorDto {
  @IsNumber()
  left: number;

  @IsNumber()
  right: number;

  @IsIn(['-', '+', '%', '/'])
  operator: string;

  @IsEmail()
  email?: string;
}
