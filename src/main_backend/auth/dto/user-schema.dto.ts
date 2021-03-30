import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ObjectId } from 'mongoose';

export class UserSchemaDto {
  // constructor(email, password, salt) {
  //   this.email = email;
  //   this.password = password;
  //   this.salt = salt;
  // }
  @IsEmail()
  @IsNotEmpty()
  @MinLength(4)
  email: string;
  @IsNotEmpty()
  @MinLength(12)
  @MaxLength(24)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
  salt?: string;
  _id?: ObjectId;
}
