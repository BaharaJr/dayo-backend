import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { RmqModule } from '../../../../libs/common/src/rmq/rmq.module';
import { CalculatorController } from './controllers/calculator.controller';
import { Calculator } from './entities/calculator.entity';
import { CalculatorService } from './services/calculator.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Calculator]),
    RmqModule,
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
export class CalculatorModules {}
