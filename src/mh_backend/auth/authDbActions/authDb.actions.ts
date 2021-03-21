import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserSchemaDto } from '../dto/user-schema.dto';
import { User, UserDocument } from '../schema/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthDbActions {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  createUser = async (userSchemaDto: UserSchemaDto) => {
    let result;
    userSchemaDto.salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(
      userSchemaDto.password,
      userSchemaDto.salt,
    );
    userSchemaDto.password = hashedPassword;
    const findDuplicate = await this.userModel.findOne(userSchemaDto);
    console.log(userSchemaDto);

    if (!findDuplicate) {
      result = await new this.userModel(userSchemaDto);
      result.save();
    } else {
      throw new ConflictException();
    }
    return result;
  };

  hashPasswort(password: string, salt: string) {
    return bcrypt.hash(password, salt);
  }
}
