import { Test, TestingModule } from '@nestjs/testing';
import { CalculatorController } from './calculator.controller';
import { CalculatorService } from './calculator.service';

describe('CalculatorController', () => {
  let calculatorController: CalculatorController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CalculatorController],
      providers: [CalculatorService],
    }).compile();

    calculatorController = app.get<CalculatorController>(CalculatorController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(calculatorController.getHello()).toBe('Hello World!');
    });
  });
});
