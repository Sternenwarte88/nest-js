import { AuthModule } from './mh_backend/auth/auth.module';
import { Module } from '@nestjs/common';
import { DevLabsController } from './dev-labs/dev-labs.controller';
import { DevLabsService } from './dev-labs/dev-labs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { mongooseConfig } from './mh_backend/config/mongoose.config';

@Module({
  imports: [AuthModule, MongooseModule.forRoot(mongooseConfig)],
  controllers: [DevLabsController],
  providers: [DevLabsService],
})
export class AppModule {}
