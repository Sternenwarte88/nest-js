import { Injectable } from '@nestjs/common';
import {
  deleteFinanceData,
  getFinanceData,
  insertFinanceData,
} from './financeDbActions/financeDb.action';
import { BaseFinanceDto, FinanceTransferDto } from './dto/financeTransfer.dto';
import { User, UserDocument } from '../../database/entities/database.entity';

@Injectable()
export class FinanceService {

  // async getFinanceData(baseFinanceDto: BaseFinanceDto) {
  //   const response = await getFinanceData(this.userModel, baseFinanceDto);
  //   return response;
  // }

  // async insertFinanceData(financeTransferDto: FinanceTransferDto) {
  //   const response = await insertFinanceData(
  //     this.userModel,
  //     financeTransferDto,
  //   );
  //   return response;
  // }

  // async deleteFinanceData(baseFinanceDto: BaseFinanceDto) {
  //   const response = await deleteFinanceData(baseFinanceDto, this.userModel);
  //   return response;
  // }
}
