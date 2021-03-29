import { PartialType } from '@nestjs/mapped-types';
import { CreateDatabaseDto } from './create-database.dto';

export class UpdateDatabaseDto extends PartialType(CreateDatabaseDto) {
  constructor(email, password, _id) {
    super();
    this.email = email;
    this.password = password;
    this._id = _id;
  }
  email;
  password;
  _id;
}
