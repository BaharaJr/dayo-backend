import { CalculatorDto } from '@app/common';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Calculator } from '../entities/calculator.entity';

@Injectable()
export class CalculatorService {
  constructor(
    @InjectRepository(Calculator)
    private readonly repository: Repository<Calculator>,
  ) {}

  calculate = async (data: CalculatorDto): Promise<Calculator> => {
    try {
      const result = eval(
        `${data.left} ${data.operator} ${Number(data.right)}`,
      );
      return await this.repository.save({ ...data, result });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  };

  history = async (email: string): Promise<Calculator[]> => {
    try {
      return await this.repository.find({ where: { email } });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  };

  delete = async (id: string, email: string): Promise<{ message: string }> => {
    try {
      await this.validate(id, email);
      await this.repository.delete(id);
      return { message: 'History deleted successfully' };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  };

  validate = async (id: string, email: string): Promise<void> => {
    const calculation = await this.repository.findOne({ where: { id, email } });
    if (!calculation)
      throw new BadRequestException('You do not have access to this resource');

    return;
  };
}
