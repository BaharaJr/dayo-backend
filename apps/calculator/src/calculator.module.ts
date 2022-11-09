import { dbConfig } from '@app/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Calculator } from './modules/entities/calculator.entity';
import { CalculatorModules } from './modules/modules.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'postgres',
      ...dbConfig,
      entities: [Calculator],
    }),
    CalculatorModules,
  ],
  controllers: [],
  providers: [],
})
export class CalculatorModule {}
