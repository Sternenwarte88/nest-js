import {
  ConflictException,
  ImATeapotException,
  Inject,
  Injectable,
  PreconditionFailedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from '../../database/database.service';
import { UpdateDatabaseDto } from '../../database/dto/update-database.dto';
import { UserSchemaDto } from '../auth/dto/user-schema.dto';

@Injectable()
export class AuthDatabaseService {
  constructor(
    @Inject(DatabaseService) private dataBaseService: DatabaseService,
  ) {}

  async createUser(userSchemaDto: UserSchemaDto) {
    const findDuplicate = await this.findUser(userSchemaDto);
    let result;
    userSchemaDto.salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(
      userSchemaDto.password,
      userSchemaDto.salt,
    );
    userSchemaDto.password = hashedPassword;

    if (!findDuplicate) {
      result = await this.dataBaseService.create(userSchemaDto);
      return await result;
    } else {
      throw new ConflictException();
    }
    return await result;
  }

  async findUser(userSchemaDto: UserSchemaDto) {
    try {
      const foundUser = await this.dataBaseService.findOne(userSchemaDto);
      return await foundUser;
    } catch {
      throw new ImATeapotException();
    }
  }

  async updateUser(userSchemaDto: UserSchemaDto) {
    const updateDatabaseDto: UpdateDatabaseDto = {
      _id: userSchemaDto._id,
      email: userSchemaDto.email,
      password: userSchemaDto.password,
    };

    const response = await this.dataBaseService.update(updateDatabaseDto);
    return response;
  }

  async deleteUser(userSchemaDto: UserSchemaDto) {
    try {
      const id = userSchemaDto._id;
      const response = await this.dataBaseService.remove(id);
      return response;
    } catch (err) {
      throw new PreconditionFailedException();
    }
  }

  hashPassword = async (userSchemaDto: UserSchemaDto) => {
    console.log('hash: ', userSchemaDto);
    const { password, salt } = userSchemaDto;
    try {
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    } catch (error) {
      throw new Error(error);
    }
  };
}
