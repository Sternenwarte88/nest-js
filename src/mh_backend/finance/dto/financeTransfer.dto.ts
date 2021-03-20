import {
  IsAlphanumeric,
  IsDate,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ObjectId } from 'mongoose';
import { possibleFinanceType } from 'src/mh_backend/finance/enums/financeType.enums';

export class FinanceTransferDto {
  @IsMongoId()
  @IsNotEmpty()
  _id: ObjectId;

  @IsEnum(possibleFinanceType)
  @IsNotEmpty()
  financeType: possibleFinanceType;

  @IsString()
  @MinLength(12)
  @MaxLength(50)
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsNumberString()
  amount: string;

  @IsNotEmpty()
  date: Date;
}
