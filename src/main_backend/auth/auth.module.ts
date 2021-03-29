import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { AuthStrategy } from './strategies/auth.strategie';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthDatabaseModule } from '../auth_database/auth_database.module';

@Module({
  imports: [
    PassportModule,
    AuthDatabaseModule,
    JwtModule.register({
      secret: 'superSafe',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthStrategy, JwtStrategy],
  exports: [],
})
export class AuthModule {}
