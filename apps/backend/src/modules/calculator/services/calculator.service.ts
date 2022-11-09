import {
  CalculatorDto,
  CalculatorErrorResponse,
  CalculatorInterface,
} from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CALCULATOR_SERVICE } from '@app/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CalculatorService {
  constructor(
    @Inject(CALCULATOR_SERVICE) private calculatorClient: ClientProxy,
  ) {}

  calculate = async (
    body: CalculatorDto,
  ): Promise<CalculatorInterface | CalculatorErrorResponse> => {
    return await lastValueFrom(
      this.calculatorClient.send('calculate', { ...body }),
    );
  };
  history = async (email: string) => {
    return await lastValueFrom(
      this.calculatorClient.send('history', { email }),
    );
  };

  delete = async (id: string, email: string) => {
    return await lastValueFrom(
      this.calculatorClient.send('history', { id, email }),
    );
  };
}
