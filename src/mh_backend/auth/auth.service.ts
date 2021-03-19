import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserSchemaDto } from './dto/user-schema.dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(userSchemaDto: UserSchemaDto) {
    const createdUser = new this.userModel(userSchemaDto);
    await createdUser.save();
    console.log(createdUser);
  }

  async loginUser(userSchemaDto: UserSchemaDto) {
    const loginUser = await this.userModel.findOne(userSchemaDto);
    console.log(loginUser);
    return loginUser;
  }
}
