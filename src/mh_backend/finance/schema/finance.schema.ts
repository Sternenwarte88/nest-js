import { financeTransferDto } from '../dto/financeTransfer.dto';

export interface FinanceType {
  income: financeTransferDto;

  bills: financeTransferDto;
}
