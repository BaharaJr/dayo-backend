import { HttpErrorFilter, LoggingInterceptor, RmqService } from '@app/common';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { CalculatorModule } from './calculator.module';

async function bootstrap() {
  const app = await NestFactory.create(CalculatorModule);
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new HttpErrorFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('CALCULATOR'));
  await app.startAllMicroservices();
  Logger.debug(`Calculator Microservice is UP`, 'CALCULATOR');
}
bootstrap();
