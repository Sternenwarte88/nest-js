import { FinanceService } from './finance.service';
import { FinanceController } from './finance.controller';
import { Module } from '@nestjs/common';
import { User, UserSchema } from '../auth/schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [FinanceController],
  providers: [FinanceService],
})
export class FinanceModule {}
