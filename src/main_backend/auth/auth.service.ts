import { Inject, Injectable } from '@nestjs/common';
import { AuthStrategy } from './strategies/auth.strategie';
import { UserSchemaDto } from './dto/user-schema.dto';
import { AuthDatabaseService } from '../auth_database/auth_database.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AuthDatabaseService)
    private authDatabaseService: AuthDatabaseService,
    @Inject(AuthStrategy) private authStrategy: AuthStrategy,
  ) {}
  Data;
  async createUser(userSchemaDto: UserSchemaDto) {
    const response = await this.authDatabaseService.createUser(userSchemaDto);
    return response;
  }

  async loginUser(userSchemaDto: UserSchemaDto) {
    const validatedUser = await this.authStrategy.validate(userSchemaDto);
    return validatedUser;
  }

  async updateUser(userSchemaDto: UserSchemaDto) {
    const response = this.authDatabaseService.updateUser(userSchemaDto);
    return response;
  }
}
