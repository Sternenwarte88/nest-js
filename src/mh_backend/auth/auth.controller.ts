import {
  BadRequestException,
  Body,
  Controller,
  ImATeapotException,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSchemaDto } from './dto/user-schema.dto';

@Controller('/mh_backend')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() userSchemaDto: UserSchemaDto) {
    const response = await this.authService.createUser(userSchemaDto);
    return response;
  }

  @Post('login')
  async logIn(@Body() userSchemaDto: UserSchemaDto) {
    const response = await this.authService.loginUser(userSchemaDto);
    if (!response) {
      throw new ImATeapotException();
    }
    return response;
  }
}
