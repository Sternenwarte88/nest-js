import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { FinanceType } from '../../finance/schema/finance.schema';

export type UserDocument = Document & User;

@Schema()
export class User {
  @Prop()
  name: string;
  @Prop()
  password: string;
  @Prop({ type: Array })
  finance: FinanceType;
}

export const UserSchema = SchemaFactory.createForClass(User);
