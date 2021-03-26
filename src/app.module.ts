import { FinanceModule } from './mh_backend/finance/finance.module';
import { AuthModule } from './mh_backend/auth/auth.module';
import { Module } from '@nestjs/common';
import { DevLabsController } from './dev-labs/dev-labs.controller';
import { DevLabsService } from './dev-labs/dev-labs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { mongooseConfig } from './main_backend/config/mongoose.config';

@Module({
  imports: [FinanceModule, AuthModule, MongooseModule.forRoot(mongooseConfig)],
  controllers: [DevLabsController],
  providers: [DevLabsService],
})
export class AppModule {}
