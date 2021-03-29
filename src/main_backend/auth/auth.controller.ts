import {
  Body,
  Controller,
  ImATeapotException,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './authGuard/jwt.guard';
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

  @UseGuards(JwtAuthGuard)
  @Patch('patch')
  async updateUser(@Body() userSchemaDto: UserSchemaDto) {
    const response = await this.authService.updateUser(userSchemaDto);
    return response;
  }
}
