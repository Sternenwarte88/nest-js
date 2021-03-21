import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserSchemaDto } from '../dto/user-schema.dto';
import { User, UserDocument } from '../schema/user.schema';

@Injectable()
export class AuthDbActions {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  createUser = async (userSchemaDto: UserSchemaDto) => {
    let result;
    const findDuplicate = await this.userModel.findOne(userSchemaDto);

    if (!findDuplicate) {
      result = await new this.userModel(userSchemaDto);
      result.save();
    } else {
      throw new ConflictException();
    }
    return result;
  };
}
