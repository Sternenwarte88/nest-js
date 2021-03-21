import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { Strategy } from 'passport-local';
import { AuthDbActions } from '../authDbActions/authDb.actions';
import { User, UserDocument } from '../schema/user.schema';

@Injectable()
export class LocalStrategie extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AuthDbActions) private authDbActions: AuthDbActions,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private JWTService: JwtService,
  ) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  private validateUser = async (email: string, pass: string) => {
    const user = await this.userModel.findOne({ email: email });
    if (user && user.password === pass) {
      const strippedResult = { email: user.email, _id: user._id };
      return strippedResult;
    }
    return null;
  };

  validate = async (email: string, password: string) => {
    const result = await this.validateUser(email, password);

    if (!result) {
      throw new BadRequestException();
    }
    return this.JWTService.sign(result);
  };
}
