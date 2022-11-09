import { HttpErrorFilter } from '@app/common';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CalculatorModule } from './modules/calculator/calculator.module';

@Module({
  imports: [CalculatorModule],
  controllers: [AppController],
  providers: [AppService, { provide: APP_FILTER, useClass: HttpErrorFilter }],
})
export class AppModule {}
