import {
  CalculatorDto,
  CalculatorErrorResponse,
  CalculatorInterface,
  HistoryRequest,
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
  history = async (data: HistoryRequest) => {
    return await lastValueFrom(
      this.calculatorClient.send('history', { ...data }),
    );
  };

  delete = async (id: string, email: string) => {
    return await lastValueFrom(
      this.calculatorClient.send('delete', { id, email }),
    );
  };
}
