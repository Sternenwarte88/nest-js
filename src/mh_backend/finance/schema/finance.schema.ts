import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { possibleFinanceType } from '../enums/financeType.enums';

export type FinanceDocument = Document & Finance;

@Schema()
export class Finance {
  @Prop()
  id: number;
  @Prop()
  financeType: possibleFinanceType;
  @Prop()
  description: string;
  @Prop()
  value: number;
  @Prop()
  date: Date;
}

export const FinanceSchema = SchemaFactory.createForClass(Finance);
