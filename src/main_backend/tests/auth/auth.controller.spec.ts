import { ImATeapotException } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Model } from 'mongoose';
import { AuthController } from '../../auth/auth.controller';
import { AuthService } from '../../auth/auth.service';
import { AuthDbActions } from '../../auth/authDbActions/authDb.actions';
import { UserSchemaDto } from '../../auth/dto/user-schema.dto';
import { User, UserDocument, UserSchema } from '../../auth/schema/user.schema';
import { AuthStrategy } from '../../auth/strategies/auth.strategie';

describe('auth.Controller test suite', () => {
  const mockUser: UserSchemaDto = {
    email: 'blabla',
    password: 'blabla',
  };

  let mockModel: Model<UserDocument>;
  let authController: AuthController;
  let authDbActions: AuthDbActions;
  let authStrategy: AuthStrategy;

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
      providers: [
        AuthService,
        AuthDbActions,
        AuthStrategy,

        { provide: getModelToken(User.name), useValue: mockModel },
      ],
    }).compile();
    authDbActions = await mockModule.get<AuthDbActions>(AuthDbActions);
    authController = await mockModule.get<AuthController>(AuthController);
    authStrategy = await mockModule.get<AuthStrategy>(AuthStrategy);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('create user should pass', async () => {
    await jest
      .spyOn(authDbActions, 'findUser')
      .mockImplementation((mockUser) => Promise.resolve(''));

    const result = await authController.signUp(mockUser);
    await expect(result.email).toContain(mockUser.email);
  });

  test('create user should throw exception', async () => {
    await jest
      .spyOn(authDbActions, 'findUser')
      .mockImplementation((mockUser) => Promise.resolve('found user'));

    // const result = await authController.signUp(mockUser);
    await expect(async () => {
      await authController.signUp(mockUser);
    }).rejects.toThrow();
  });

  test('user login should pass', async () => {
    await jest.spyOn(authStrategy, 'validate').mockResolvedValue('some token');
    // console.log(await authController.logIn(mockUser));
    await expect(await authController.logIn(mockUser)).toBe('some token');
  });

  test('user login should fail', async () => {
    await jest.spyOn(authStrategy, 'validateUser').mockResolvedValue(undefined);
    // // console.log(await authController.logIn(mockUser));
    await expect(async () => {
      await authController.logIn(mockUser);
    }).rejects.toThrowError(ImATeapotException);
  });
});
