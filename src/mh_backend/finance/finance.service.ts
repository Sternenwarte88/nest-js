import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../auth/schema/user.schema';
import {
  deleteFinanceData,
  getFinanceData,
  insertFinanceData,
} from './dbHandler/financedb.action';
import { BaseFinanceDto, FinanceTransferDto } from './dto/financeTransfer.dto';

@Injectable()
export class FinanceService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getFinanceData(baseFinanceDto: BaseFinanceDto) {
    const response = await getFinanceData(this.userModel, baseFinanceDto);
    return response;
  }

  async insertFinanceData(financeTransferDto: FinanceTransferDto) {
    const response = await insertFinanceData(
      this.userModel,
      financeTransferDto,
    );
    return response;
  }

  async deleteFinanceData(baseFinanceDto: BaseFinanceDto) {
    const response = await deleteFinanceData(baseFinanceDto, this.userModel);
    return response;
  }
}
