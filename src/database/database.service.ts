import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserSchemaDto } from '../main_backend/auth/dto/user-schema.dto';
import { UpdateDatabaseDto } from './dto/update-database.dto';
import { User, UserDocument } from './entities/database.entity';

@Injectable()
export class DatabaseService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async create(userSchemaDto: UserSchemaDto) {
    const user = await new this.userModel(userSchemaDto);
    await user.save();
    return user;
  }

  findAll() {
    return `This action returns all database`;
  }

  async findOne(userSchemaDto: UserSchemaDto) {
    const user = await this.userModel.findOne(userSchemaDto);
    return user;
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

  remove(id: number) {
    // return `This action removes a #${id} database`;
  }
}
