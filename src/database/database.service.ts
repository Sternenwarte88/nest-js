import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { UserSchemaDto } from '../main_backend/auth/dto/user-schema.dto';
import { UpdateDatabaseDto } from './dto/update-database.dto';
import { User, UserDocument } from './entities/database.entity';

@Injectable()
export class DatabaseService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async create(userSchemaDto: UserSchemaDto) {
    try {
      const user = await new this.userModel(userSchemaDto);
      await user.save();
      return await user;
    } catch (err) {
      throw new ConflictException();
    }
  }

  findAll() {
    return `This action returns all database`;
  }

  async findOne(userSchemaDto: UserSchemaDto) {
    const email = userSchemaDto.email;
    try {
      const foundUser = await this.userModel.findOne({ email });
      return await foundUser;
    } catch (err) {
      throw new BadRequestException();
    }
  }

  async update(updateDatabaseDto: UpdateDatabaseDto) {
    const updatedUser = await this.userModel.updateOne(
      {
        _id: updateDatabaseDto._id,
      },
      updateDatabaseDto,
    );
    return await updatedUser;
  }

  async remove(id: ObjectId) {
    const deletedUser = await this.userModel.deleteOne({ _id: id });
    return deletedUser;
  }
}
