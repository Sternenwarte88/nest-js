import { Module } from '@nestjs/common';
import { DevLabsController } from './dev-labs/dev-labs.controller';
import { DevLabsService } from './dev-labs/dev-labs.service';

@Module({
  imports: [],
  controllers: [DevLabsController],
  providers: [DevLabsService],
})
export class AppModule {}
