import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalculatorController } from './controllers/calculator.controller';
import { Calculator } from './entities/calculator.entity';
import { CalculatorService } from './services/calculator.service';

@Module({
  imports: [TypeOrmModule.forFeature([Calculator])],
  controllers: [CalculatorController],
  providers: [CalculatorService],
})
export class CalculatorModules {}
