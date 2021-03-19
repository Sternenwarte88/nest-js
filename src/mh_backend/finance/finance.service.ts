import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../auth/schema/user.schema';
import { insertFinanceData } from './dbHandler/financedb.action';
import { FinanceTransferDto } from './dto/financeTransfer.dto';

@Injectable()
export class FinanceService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async insertFinanceData(financeTransferDto: FinanceTransferDto) {
    const response = await insertFinanceData(
      this.userModel,
      financeTransferDto,
    );
    return response;
  }
}
