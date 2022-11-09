import {
  CalculatorDtoReq,
  CalculatorErrorResponse,
  CalculatorInterface,
  CalculatorSuccessResponse,
  HistoryRequest,
} from '@app/common';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { CalculatorService } from '../services/calculator.service';

@Controller()
export class CalculatorController {
  constructor(private readonly service: CalculatorService) {}

  @Get()
  home() {
    return { status: 'Ok' };
  }

  @Post('api/calculations')
  async calculator(
    @Body() payload: CalculatorDtoReq,
    @Req() req: any,
    @Res() res: any,
  ): Promise<CalculatorInterface | CalculatorErrorResponse> {
    const calculation: CalculatorInterface | CalculatorErrorResponse =
      await this.service.calculate({
        ...payload,
        email: req.user.email,
      });
    return res
      .status(calculation.status || HttpStatus.OK)
      .send({ ...calculation });
  }

  @Get('api/calculations')
  async history(
    @Req() req: any,
    @Res() res: any,
    @Query() query: HistoryRequest,
  ): Promise<CalculatorInterface[] | CalculatorErrorResponse> {
    const history = await this.service.history(query);
    return res.status(history.status || HttpStatus.OK).send(history);
  }

  @Delete('api/calculations/:id')
  async delete(
    @Param('id') id: string,
    @Req() req: any,
    @Res() res: any,
  ): Promise<CalculatorSuccessResponse | CalculatorErrorResponse> {
    const response: CalculatorSuccessResponse | CalculatorErrorResponse =
      await this.service.delete(id, req.user.email);
    return res.status(response.status || HttpStatus.OK).send(response);
  }
}
