import { FinanceService } from './finance.service';
import { FinanceController } from './finance.controller';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [FinanceController],
  providers: [FinanceService],
})
export class FinanceModule {}
