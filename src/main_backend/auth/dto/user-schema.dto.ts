import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserSchemaDto {
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
}