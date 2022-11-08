import { NestFactory } from '@nestjs/core';
import { CalculatorModule } from './calculator.module';

async function bootstrap() {
  const app = await NestFactory.create(CalculatorModule);
  await app.listen(3000);
}
bootstrap();
