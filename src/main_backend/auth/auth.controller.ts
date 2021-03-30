import {
  Body,
  Controller,
  ImATeapotException,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './authGuard/jwt.guard';
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
    try {
      const response = await this.authService.loginUser(userSchemaDto);
      return response;
    } catch (err) {
      throw new ImATeapotException();
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('patch')
  async updateUser(@Body() userSchemaDto: UserSchemaDto) {
    const response = await this.authService.updateUser(userSchemaDto);
    return response;
  }
}
