import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSchemaDto } from './dto/user-schema.dto';

@Controller('/mh_backend')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() userSchemaDto: UserSchemaDto) {
    await this.authService.createUser(userSchemaDto);
  }

  @Post('login')
  async logIn(@Body() userSchemaDto: UserSchemaDto) {
    const loggedInUser = await this.authService.loginUser(userSchemaDto);
    return loggedInUser;
  }
}
