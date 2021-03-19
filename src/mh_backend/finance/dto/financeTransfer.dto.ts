import { financeType } from 'src/mh_backend/finance/enums/financeType.enums';

export interface financeTransferDto {
  financeType: financeType;
  description: string;
  value: number;
  date: Date;
}
