import {
  Body,
  Controller,
  ImATeapotException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './authGuard/local.guard';
import { UserSchemaDto } from './dto/user-schema.dto';

@Controller('/mh_backend')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() userSchemaDto: UserSchemaDto) {
    const response = await this.authService.createUser(userSchemaDto);
    return response;
  }
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async logIn(@Body() userSchemaDto: UserSchemaDto) {
    let response;
    try {
      response = await this.authService.loginUser(userSchemaDto);
    } catch (err) {
      throw new ImATeapotException();
    }
    return response;
  }
}
