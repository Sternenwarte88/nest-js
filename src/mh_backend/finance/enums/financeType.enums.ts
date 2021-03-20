import { BaseFinanceDto, FinanceTransferDto } from '../dto/financeTransfer.dto';

export enum possibleFinanceType {
  income = 'income',
  bills = 'bills',
  all = 'all',
}

export function validateFinanceType(dto: FinanceTransferDto | BaseFinanceDto) {
  let financeType;
  switch (dto.financeType) {
    case 'income':
      financeType = 'finance.income';
      break;

    case 'bills':
      financeType = 'finance.bills';
      break;

    case 'all':
      financeType = 'finance';
      break;

    default:
      console.error('Invalid financeType');
      break;
  }
  return financeType;
}
