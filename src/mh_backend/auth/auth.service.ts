import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { LocalStrategie } from './strategies/auth.strategie';
import { AuthDbActions } from './authDbActions/authDb.actions';
import { UserSchemaDto } from './dto/user-schema.dto';
import { User, UserDocument } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject(AuthDbActions) private authDbActions: AuthDbActions,
    @Inject(LocalStrategie) private localStrategie: LocalStrategie,
  ) {}

  async createUser(userSchemaDto: UserSchemaDto) {
    const response = await this.authDbActions.createUser(userSchemaDto);
    return response;
  }

  async loginUser(userSchemaDto: UserSchemaDto) {
    const { email, password } = userSchemaDto;
    const validatedUser = await this.localStrategie.validate(email, password);
    return validatedUser;
  }
}
