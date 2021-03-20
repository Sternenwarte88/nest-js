import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { BaseFinanceDto, FinanceTransferDto } from './dto/financeTransfer.dto';
import { FinanceService } from './finance.service';

@Controller('mh_backend')
export class FinanceController {
  constructor(private financeService: FinanceService) {}

  @Get('getFinance')
  async getFinanceData(@Body() baseFinanceDto: BaseFinanceDto) {
    const response = await this.financeService.getFinanceData(baseFinanceDto);
    return response;
  }

  @Post('insertFinance')
  async insertFinanceData(@Body() financeTransferDto: FinanceTransferDto) {
    const response = await this.financeService.insertFinanceData(
      financeTransferDto,
    );
    return response;
  }

  @Delete('deleteFinanceData')
  async deleteFinanceData(@Body() baseFinanceDto: BaseFinanceDto) {
    const response = await this.financeService.deleteFinanceData(
      baseFinanceDto,
    );
    return response;
  }
}
