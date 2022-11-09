import { CalculatorDto, HistoryRequest, RmqService } from '@app/common';
import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { CalculatorService } from '../services/calculator.service';

@Controller()
export class CalculatorController {
  constructor(
    private readonly calculatorService: CalculatorService,
    private rmqService: RmqService,
  ) {}

  @EventPattern('calculate')
  async calculate(@Payload() data: CalculatorDto, @Ctx() context: RmqContext) {
    const result = await this.calculatorService.calculate(data);
    this.rmqService.ack(context);
    return result;
  }

  @EventPattern('history')
  async history(@Payload() data: HistoryRequest, @Ctx() context: RmqContext) {
    const result = await this.calculatorService.history(data);
    this.rmqService.ack(context);
    return result;
  }

  @EventPattern('delete')
  async delete(
    @Payload() data: { id: string; email: string },
    @Ctx() context: RmqContext,
  ) {
    const result = await this.calculatorService.delete(data.id, data.email);
    this.rmqService.ack(context);
    return result;
  }
}
