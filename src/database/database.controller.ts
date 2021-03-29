import { Controller } from '@nestjs/common';
import { UserSchemaDto } from '../main_backend/auth/dto/user-schema.dto';
import { DatabaseService } from './database.service';
import { CreateDatabaseDto } from './dto/create-database.dto';
import { UpdateDatabaseDto } from './dto/update-database.dto';

@Controller('database')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}
  private readonly userSchemaDto: UserSchemaDto;

  create(createDatabaseDto: CreateDatabaseDto) {
    return this.databaseService.create(createDatabaseDto);
  }

  findOne(userSchemaDto) {
    return this.databaseService.findOne(userSchemaDto);
  }

  update(id: string, updateDatabaseDto: UpdateDatabaseDto) {
    return this.databaseService.update(updateDatabaseDto);
  }

  remove(id: string) {
    return this.databaseService.remove(+id);
  }
}
