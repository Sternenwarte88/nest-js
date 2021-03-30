import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthDatabaseService } from '../../auth_database/auth_database.service';
import { UserSchemaDto } from '../dto/user-schema.dto';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AuthDatabaseService)
    private authdatabaseService: AuthDatabaseService,
    private JWTService: JwtService,
  ) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  validateUser = async (userSchemaDto: UserSchemaDto) => {
    const user = await this.authdatabaseService.findUser(userSchemaDto);
    userSchemaDto.salt = user.salt;
    console.log('authstr', userSchemaDto);
    const hashedPassword = await this.authdatabaseService.hashPassword(
      userSchemaDto,
    );
    console.log(user, hashedPassword, user.password);

    if (user && user.password === hashedPassword) {
      const strippedResult = { email: user.email, _id: user._id };
      console.log(strippedResult);
      return strippedResult;
    }
  };

  validate = async (userSchemaDto: UserSchemaDto) => {
    const result = await this.validateUser(userSchemaDto);
    console.log('result', result);

    if (!result) {
      throw new BadRequestException();
    }
    return this.JWTService.sign(result);
  };
}
