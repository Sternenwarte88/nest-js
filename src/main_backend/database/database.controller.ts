import { Controller } from '@nestjs/common';
import { UserSchemaDto } from '../auth/dto/user-schema.dto';
import { DatabaseService } from './database.service';

@Controller('database')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {
    userSchemaDto: UserSchemaDto;
  }

  createUser = (userSchemaDto) => {
    const response = this.databaseService.createUser(userSchemaDto);
    return response;
  };

  hashPassword = (password, salt) => {
    const hashedPassword = this.databaseService.hashPassword(password, salt);
    return hashedPassword;
  };
}
