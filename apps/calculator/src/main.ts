import { HttpErrorFilter, LoggingInterceptor } from '@app/common';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { CalculatorModule } from './calculator.module';

async function bootstrap() {
  const app = await NestFactory.create(CalculatorModule);
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new HttpErrorFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.debug(`Calculator listening on port: ${port}`, 'API');
}
bootstrap();
