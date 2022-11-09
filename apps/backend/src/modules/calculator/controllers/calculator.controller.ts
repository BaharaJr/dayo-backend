import { Controller } from '@nestjs/common';
import { CalculatorService } from '../services/calculator.service';

@Controller()
export class CalculatorController {
  constructor(private readonly service: CalculatorService) {}
}
