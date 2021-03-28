import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { AuthStrategy } from './strategies/auth.strategie';
import { UserSchemaDto } from './dto/user-schema.dto';
import { User, UserDocument } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject(DatabaseService) private databaseService: DatabaseService,
    @Inject(AuthStrategy) private authStrategy: AuthStrategy,
  ) {}
  Data;
  async createUser(userSchemaDto: UserSchemaDto) {
    const response = await this.databaseService.createUser(userSchemaDto);
    return response;
  }

  async loginUser(userSchemaDto: UserSchemaDto) {
    const { email, password } = userSchemaDto;
    const validatedUser = await this.authStrategy.validate(email, password);
    return validatedUser;
  }
}
