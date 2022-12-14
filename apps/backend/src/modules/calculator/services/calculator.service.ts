import {
  CalculatorDto,
  CalculatorErrorResponse,
  CalculatorInterface,
  CALCULATOR_SERVICE,
  HistoryRequestDto,
} from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
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
  history = async (data: HistoryRequestDto) => {
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
