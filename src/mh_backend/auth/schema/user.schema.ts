import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = Document & User;

@Schema()
export class User {
  @Prop()
  name: string;
  @Prop()
  password: string;
  @Prop({ type: Array })
  finance: { income: Record<string>; bills: Record<string> };
}

export const UserSchema = SchemaFactory.createForClass(User);
