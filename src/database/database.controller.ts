import { Controller, PreconditionFailedException } from '@nestjs/common';
import { UserSchemaDto } from '../main_backend/auth/dto/user-schema.dto';
import { DatabaseService } from './database.service';
import { CreateDatabaseDto } from './dto/create-database.dto';
import { UpdateDatabaseDto } from './dto/update-database.dto';

@Controller('database')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}
  private readonly userSchemaDto: UserSchemaDto;

  async create(createDatabaseDto: CreateDatabaseDto) {
    return await this.databaseService.create(createDatabaseDto);
  }

  async findOne(userSchemaDto) {
    try {
      return await this.databaseService.findOne(userSchemaDto);
    } catch (err) {
      throw new PreconditionFailedException();
    }
  }

  async update(id: string, updateDatabaseDto: UpdateDatabaseDto) {
    return await this.databaseService.update(updateDatabaseDto);
  }

  async remove(id: string) {
    return await this.databaseService.remove(+id);
  }
}
