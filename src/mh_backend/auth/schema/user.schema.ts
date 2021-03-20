import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { FinanceTransferDto } from 'src/mh_backend/finance/dto/financeTransfer.dto';

export type UserDocument = Document & User;

@Schema()
export class User {
  @Prop()
  name: string;
  @Prop()
  password: string;
  @Prop({ type: Array })
  finance: {
    income: FinanceTransferDto;
    bills: FinanceTransferDto;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);
