import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CalculatorDto } from '@app/common';
import { CalculatorService } from '../services/calculator.service';

@Controller()
export class CalculatorController {
  constructor(private readonly service: CalculatorService) {}

  @Get()
  home() {
    return { status: 'Ok' };
  }

  @Post('api/calculations')
  calculator(@Body() payload: CalculatorDto) {
    return this.service.calculate(payload);
  }

  @Get('api/calculations')
  async history(@Query('email') email: string) {
    return this.service.history(email);
  }

  @Delete('api/calculations/:id')
  async delte(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
