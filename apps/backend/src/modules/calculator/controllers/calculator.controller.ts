import { CalculatorDto } from '@app/common';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { CalculatorService } from '../services/calculator.service';

@Controller()
export class CalculatorController {
  constructor(private readonly service: CalculatorService) {}

  @Get()
  home() {
    return { status: 'Ok' };
  }

  @Post('api/calculations')
  calculator(@Body() payload: CalculatorDto, @Req() req: any) {
    return this.service.calculate({ ...payload, email: req.user.email });
  }

  @Get('api/calculations')
  async history(@Req() req: any) {
    return this.service.history(req.user.email);
  }

  @Delete('api/calculations/:id')
  async delete(@Param('id') id: string, @Req() req: any) {
    return this.service.delete(id, req.user.email);
  }
}
