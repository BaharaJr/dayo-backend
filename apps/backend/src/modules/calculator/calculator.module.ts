import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { CALCULATOR_SERVICE, RmqModule } from '@app/common';
import { CalculatorController } from './controllers/calculator.controller';
import { CalculatorService } from './services/calculator.service';

@Module({
  imports: [
    RmqModule.register({ name: CALCULATOR_SERVICE }),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_CALCULATOR_QUEUE: Joi.string().required(),
      }),
    }),
  ],
  controllers: [CalculatorController],
  providers: [CalculatorService],
})
export class CalculatorModule {}
