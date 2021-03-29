import { Controller } from '@nestjs/common';
import { UserSchemaDto } from '../auth/dto/user-schema.dto';
import { AuthDatabaseService } from './auth_database.service';

@Controller('database')
export class AuthDatabaseController {
  constructor(private readonly authDatabaseService: AuthDatabaseService) {
    userSchemaDto: UserSchemaDto;
  }

  createUser = (userSchemaDto: UserSchemaDto) => {
    const response = this.authDatabaseService.createUser(userSchemaDto);
    return response;
  };

  hashPassword = (userSchemaDto: UserSchemaDto) => {
    const hashedPassword = this.authDatabaseService.hashPassword(userSchemaDto);
    return hashedPassword;
  };
}
