import { BadRequestException } from '@nestjs/common';
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumberString,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ObjectId } from 'mongoose';
import { possibleFinanceType } from 'src/mh_backend/finance/enums/financeType.enums';

export class BaseFinanceDto {
  @IsMongoId()
  @IsNotEmpty({
    message: () => {
      throw new BadRequestException();
    },
  })
  _id: ObjectId;

  @IsEnum(possibleFinanceType)
  @IsNotEmpty()
  financeType: possibleFinanceType;
}
export class FinanceTransferDto extends BaseFinanceDto {
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
