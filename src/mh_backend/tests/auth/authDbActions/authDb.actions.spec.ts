import * as bcrypt from 'bcrypt';
import { User, UserSchema } from '../../../auth/schema/user.schema';
import { AuthDbActions } from '../../../auth/authDbActions/authDb.actions';
import { AuthService } from '../../../auth/auth.service';
import { Test } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from '../../../auth/auth.controller';
import { AuthStrategy } from '../../../auth/strategies/auth.strategie';
import { JwtStrategy } from '../../../auth/strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { UserSchemaDto } from 'src/mh_backend/auth/dto/user-schema.dto';
import { ConflictException } from '@nestjs/common';

describe('Authentification Database actions testsuite', () => {
  let authDbActions: AuthDbActions;

  const mockUser: UserSchemaDto = {
    email: 'blabla',
    password: 'blabla',
  };
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
      providers: [AuthService, AuthDbActions, AuthStrategy, JwtStrategy],
    }).compile();
    authDbActions = await mockModule.get<AuthDbActions>(AuthDbActions);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('hashed Password should be a truthy', async () => {
    const testsalt = await bcrypt.genSalt();
    const testResult = await authDbActions.hashPassword(
      mockUser.password,
      testsalt,
    );

    expect(testResult).toBeTruthy();
  });

  test('hashed Password should be falsy', async () => {
    const testsalt = undefined;

    await expect(
      authDbActions.hashPassword(mockUser.password, testsalt),
    ).rejects.toThrowError();
  });

  test('test foundUser should be falsy', async () => {
    const foundUser = await authDbActions.findUser(mockUser);
    await expect(foundUser).toBeFalsy();
  });

  test('findUser should throw exception', async () => {
    expect(async () => {
      await authDbActions.findUser('');
    }).rejects.toThrowError();
  });

  test('createUser should resolve', async () => {
    await jest
      .spyOn(authDbActions, 'findUser')
      .mockImplementation((mockUser) => Promise.resolve(''));

    const result = await authDbActions.createUser(mockUser);

    await expect(result.email).toContain(mockUser.email);
  });

  test('createUser should fail', async () => {
    await jest
      .spyOn(authDbActions, 'findUser')
      .mockImplementation(async (mockUser) => await Promise.resolve(mockUser));

    await expect(async () => {
      await authDbActions.createUser(mockUser);
    }).rejects.toThrow(ConflictException);
  });
});
