import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CalculatorDto } from '../../../../../libs/common/src';
import { CalculatorService } from '../services/calculator.service';

@Controller()
export class CalculatorController {
  constructor(private readonly calculatorService: CalculatorService) {}

  @Post()
  calculator(@Body() payload: CalculatorDto) {
    return this.calculatorService.calculate(payload);
  }

  @Get()
  async history(@Query('email') email: string) {
    return await this.calculatorService.history(email);
  }
}
