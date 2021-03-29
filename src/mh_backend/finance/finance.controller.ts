import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../main_backend/auth/authGuard/jwt.guard';
import { BaseFinanceDto, FinanceTransferDto } from './dto/financeTransfer.dto';
import { FinanceService } from './finance.service';

@Controller('mh_backend')
export class FinanceController {
  constructor(private financeService: FinanceService) {}

  // @UseGuards(JwtAuthGuard)
  // @Get('getFinance')
  // async getFinanceData(@Body() baseFinanceDto: BaseFinanceDto) {
  //   const response = await this.financeService.getFinanceData(baseFinanceDto);
  //   return response;
  // }
  // @UseGuards(JwtAuthGuard)
  // @Post('insertFinance')
  // async insertFinanceData(@Body() financeTransferDto: FinanceTransferDto) {
  //   const response = await this.financeService.insertFinanceData(
  //     financeTransferDto,
  //   );
  //   return response;
  // }
  // @UseGuards(JwtAuthGuard)
  // @Delete('deleteFinanceData')
  // async deleteFinanceData(@Body() baseFinanceDto: BaseFinanceDto) {
  //   const response = await this.financeService.deleteFinanceData(
  //     baseFinanceDto,
  //   );
  //   return response;
  // }
}
