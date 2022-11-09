import {
  CalculatorDto,
  CalculatorErrorResponse,
  CalculatorSuccessResponse,
  HistoryRequest,
  HistoryResponse,
} from '@app/common';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Calculator } from '../entities/calculator.entity';

@Injectable()
export class CalculatorService {
  constructor(
    @InjectRepository(Calculator)
    private readonly repository: Repository<Calculator>,
  ) {}

  calculate = async (
    data: CalculatorDto,
  ): Promise<Calculator | CalculatorErrorResponse> => {
    try {
      return await this.getHistory(data);
    } catch (e) {
      return { status: HttpStatus.BAD_REQUEST, error: e.message };
    }
  };

  getHistory = async (
    data: CalculatorDto,
  ): Promise<Calculator | CalculatorErrorResponse> => {
    try {
      const history = await this.repository.findOne({
        where: {
          email: data.email,
          operator: data.operator,
          left: data.left,
          right: data.right,
        },
      });
      return await this.saveCalculation(history, data);
    } catch (e) {
      return { status: HttpStatus.BAD_REQUEST, error: e.message };
    }
  };

  saveCalculation = async (history: Calculator, data: CalculatorDto) => {
    if (history) {
      return history;
    }
    const result = eval(`${data.left} ${data.operator} ${Number(data.right)}`);
    return await this.repository.save({ ...data, result });
  };

  history = async (
    data: HistoryRequest,
  ): Promise<HistoryResponse | CalculatorErrorResponse> => {
    try {
      const [history, total] = await this.repository.findAndCount({
        where: { email: data.email },
        take: data.pageSize,
        skip: Number(data.pageSize) * Number(data.page),
      });
      return { total, history };
    } catch (e) {
      return { status: HttpStatus.BAD_REQUEST, error: e.message };
    }
  };

  delete = async (
    id: string,
    email: string,
  ): Promise<CalculatorSuccessResponse | CalculatorErrorResponse> => {
    try {
      return await this.validateAndDelete(id, email);
    } catch (e) {
      return { status: HttpStatus.BAD_REQUEST, error: e.message };
    }
  };

  validateAndDelete = async (
    id: string,
    email: string,
  ): Promise<CalculatorSuccessResponse | CalculatorErrorResponse> => {
    const calculation = await this.repository.findOne({ where: { id, email } });
    if (!calculation)
      return {
        error: 'You do not have access to this resource',
        status: HttpStatus.BAD_REQUEST,
      };

    return this.deleteHistory(id);
  };

  deleteHistory = async (
    id: string,
  ): Promise<CalculatorSuccessResponse | CalculatorErrorResponse> => {
    try {
      await this.repository.delete(id);
      return { message: 'History deleted successfully' };
    } catch (e) {
      return { status: HttpStatus.BAD_REQUEST, error: e.message };
    }
  };
}
