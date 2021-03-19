import { ObjectId } from 'mongoose';
import { possibleFinanceType } from 'src/mh_backend/finance/enums/financeType.enums';

export interface FinanceTransferDto {
  _id: ObjectId;
  financeType: possibleFinanceType;
  description: string;
  amount: number;
  date: Date;
}
