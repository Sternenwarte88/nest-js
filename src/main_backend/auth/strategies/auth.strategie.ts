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
    const hashedPassword = await this.authdatabaseService.hashPassword(
      userSchemaDto,
    );

    if (user && user.password === hashedPassword) {
      const strippedResult = { email: user.email, _id: user._id };
      return strippedResult;
    }
  };

  validate = async (userSchemaDto: UserSchemaDto) => {
    const result = await this.validateUser(userSchemaDto);

    if (!result) {
      throw new BadRequestException();
    }
    return this.JWTService.sign(result);
  };
}
