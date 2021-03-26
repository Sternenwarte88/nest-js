import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { FinanceTransferDto } from 'src/mh_backend/finance/dto/financeTransfer.dto';

export type UserDocument = Document & User;

@Schema()
export class User {
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop({ type: Array })
  finance: {
    income: FinanceTransferDto;
    bills: FinanceTransferDto;
  };
  @Prop({ type: Array })
  tasks: {
    toDo;
    piw_ToDo;
    finished_ToDo;
    canceled_ToDos;
  };
  @Prop()
  salt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
