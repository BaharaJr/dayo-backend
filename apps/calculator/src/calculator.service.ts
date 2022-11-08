import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculatorService {
  getHello(): string {
    return 'Hello World!';
  }
}
