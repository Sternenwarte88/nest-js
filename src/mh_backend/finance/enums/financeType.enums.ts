import { FinanceTransferDto } from '../dto/financeTransfer.dto';

export enum possibleFinanceType {
  income = 'income',
  bills = 'bills',
}

export function validateFinanceType(financeTransferDto: FinanceTransferDto) {
  let financeType;
  switch (financeTransferDto.financeType) {
    case 'income':
      financeType = 'finance.income';
      break;

    case 'bills':
      financeType = 'finance.bills';
      break;

    default:
      console.error('Invalid financeType');
      break;
  }
  return financeType;
}
