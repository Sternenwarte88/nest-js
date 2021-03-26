import {
  ConflictException,
  ImATeapotException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserSchemaDto } from '../dto/user-schema.dto';
import { User, UserDocument } from '../schema/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthDbActions {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(userSchemaDto: UserSchemaDto) {
    let result;
    userSchemaDto.salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(
      userSchemaDto.password,
      userSchemaDto.salt,
    );
    userSchemaDto.password = hashedPassword;
    const findDuplicate = await this.findUser(userSchemaDto);

    if (!findDuplicate) {
      result = await new this.userModel(userSchemaDto);
      await result.save();
    } else {
      throw new ConflictException();
    }
    return await result;
  }

  async findUser(userSchemaDto) {
    let foundUser;
    try {
      foundUser = await this.userModel.findOne(userSchemaDto);
      return await foundUser;
    } catch {
      throw new ImATeapotException();
    }
  }

  hashPassword = async (password: string, salt: string) => {
    try {
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    } catch (error) {
      throw new Error(error);
    }
  };
}
