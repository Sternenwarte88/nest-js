import { Body, Controller, Post } from '@nestjs/common';
import { FinanceTransferDto } from './dto/financeTransfer.dto';
import { FinanceService } from './finance.service';

@Controller('mh_backend')
export class FinanceController {
  constructor(private financeService: FinanceService) {}

  @Post('insertFinance')
  async insertFinanceData(@Body() financeTransferDto: FinanceTransferDto) {
    const response = await this.financeService.insertFinanceData(
      financeTransferDto,
    );
    return response;
  }
}
