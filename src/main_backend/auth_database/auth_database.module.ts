import { Module } from '@nestjs/common';
import { AuthDatabaseService } from './auth_database.service';
import { AuthDatabaseController } from './auth_database.controller';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthDatabaseController],
  providers: [AuthDatabaseService],
  exports: [AuthDatabaseService],
})
export class AuthDatabaseModule {}
