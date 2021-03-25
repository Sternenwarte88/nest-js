import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { AuthController } from '../../auth/auth.controller';
import { AuthService } from '../../auth/auth.service';
import { AuthDbActions } from '../../auth/authDbActions/authDb.actions';
import { UserSchemaDto } from '../../auth/dto/user-schema.dto';
import { User, UserSchema } from '../../auth/schema/user.schema';
import { LocalStrategie } from '../../auth/strategies/auth.strategie';
import { JwtStrategy } from '../../auth/strategies/jwt.strategy';

describe('auth.Controller test suite', () => {
  const mockUser: UserSchemaDto = {
    email: 'blabla',
    password: 'blabla',
  };
  let mockAuthController;
  let authController: AuthController;
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
      providers: [
        AuthService,
        AuthDbActions,
        LocalStrategie,
        JwtStrategy,
        // { provide: AuthController, useFactory: mockAuthController },
      ],
    }).compile();
    authDbActions = await mockModule.get<AuthDbActions>(AuthDbActions);
    authController = await mockModule.get<AuthController>(AuthController);
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
});
