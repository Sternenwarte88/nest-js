import {
  Controller,
  NotAcceptableException,
  PreconditionFailedException,
} from '@nestjs/common';
import { UserSchemaDto } from '../auth/dto/user-schema.dto';
import { AuthDatabaseService } from './auth_database.service';

@Controller('database')
export class AuthDatabaseController {
  constructor(private readonly authDatabaseService: AuthDatabaseService) {
    userSchemaDto: UserSchemaDto;
  }

  createUser = (userSchemaDto: UserSchemaDto) => {
    try {
      const response = this.authDatabaseService.createUser(userSchemaDto);
      return response;
    } catch (err) {
      throw new PreconditionFailedException();
    }
  };

  hashPassword = (userSchemaDto: UserSchemaDto) => {
    const hashedPassword = this.authDatabaseService.hashPassword(userSchemaDto);
    return hashedPassword;
  };

  findUser = async (userSchemaDto: UserSchemaDto) => {
    try {
      const foundUser = this.authDatabaseService.findUser(userSchemaDto);
      return await foundUser;
    } catch (err) {
      throw new NotAcceptableException();
    }
  };

  updateUser = () => {};

  deleteUser = async (userSchemaDto) => {
    const response = await this.authDatabaseService.deleteUser(userSchemaDto);
    return response;
  };
}
