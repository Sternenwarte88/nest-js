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
  }

  async loginUser(userSchemaDto: UserSchemaDto) {
    const response = await this.userModel.findOne(userSchemaDto);
    console.log(response);
    return response;
  }
}
