import * as bcrypt from 'bcrypt';
import { User, UserSchema } from '../../../auth/schema/user.schema';
import { AuthDbActions } from '../../../auth/authDbActions/authDb.actions';
import { AuthService } from '../../../auth/auth.service';
import { Test } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from '../../../auth/auth.controller';
import { LocalStrategie } from '../../../auth/strategies/auth.strategie';
import { JwtStrategy } from '../../../auth/strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

const mockAuthDb = () => ({});
describe('Authentification Database actions testsuite', () => {
  let authDbActions: AuthDbActions;

  beforeEach(async () => {
    const mockModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(process.env.MONGO_URL),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtModule.register({
          secret: 'superSafe',
          signOptions: { expiresIn: '60s' },
        }),
      ],

      controllers: [AuthController],
      providers: [AuthService, AuthDbActions, LocalStrategie, JwtStrategy],
    }).compile();
    authDbActions = await mockModule.get<AuthDbActions>(AuthDbActions);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  test('hashed Password should be a truthy', async () => {
    const testData = 'test';
    const testsalt = await bcrypt.genSalt();
    const testResult = await authDbActions.hashPassword(testData, testsalt);

    expect(testResult).toBeTruthy();
  });
  test('hashed Password should be falsy', async () => {
    const testData = 'test';
    const testsalt = undefined;

    await expect(
      authDbActions.hashPassword(testData, testsalt),
    ).rejects.toThrowError();
  });
  test('test foundUser should be falsy', async () => {
    const mockUser = {
      email: 'blabla',
      password: 'blabla',
    };
    const foundUser = await authDbActions.findUser(mockUser);
    expect(foundUser).toBeFalsy();
  });
  test('findUser should throw exception', async () => {
    expect(async () => {
      await authDbActions.findUser(null);
    }).rejects.toThrowError();
  });
});
