import { IsEmail, IsIn, IsNotEmpty, IsNumber } from 'class-validator';

export class CalculatorDto {
  @IsNumber()
  left: number;

  @IsNumber()
  right: number;

  @IsIn(['-', '+', '%', '/', '*'])
  operator: string;

  @IsEmail()
  email?: string;
}
export class CalculatorDtoReq {
  @IsNumber()
  left: number;

  @IsNumber()
  right: number;

  @IsIn(['-', '+', '%', '/', '*'])
  operator: string;
}

export class HistoryRequestDto {
  @IsNumber()
  @IsNotEmpty()
  page: number;

  @IsNumber()
  @IsNotEmpty()
  pageSize: number;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
