import * as bcrypt from 'bcrypt';
import { AuthService } from '../../../auth/auth.service';
import { Test } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from '../../../auth/auth.controller';
import { AuthStrategy } from '../../../auth/strategies/auth.strategie';
import { JwtStrategy } from '../../../auth/strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthDatabaseController } from '../../../auth_database/auth_database.controller';
import { AuthDatabaseModule } from '../../../auth_database/auth_database.module';
import { UserSchemaDto } from '../../../auth/dto/user-schema.dto';
import {
  User,
  UserSchema,
} from '../../../../database/entities/database.entity';
import { AuthDatabaseService } from '../../../auth_database/auth_database.service';
import { DatabaseModule } from '../../../../database/database.module';

describe('Authentification Database actions testsuite', () => {
  let authDatabaseController: AuthDatabaseController;
  let authDatabaseService: AuthDatabaseService;
  const mockUser: UserSchemaDto = {
    email: 'blabla',
    password: 'blabla',
    salt: undefined,
  };

  beforeEach(async () => {
    const mockModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(process.env.MONGO_URL),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        AuthDatabaseModule,
        DatabaseModule,
        JwtModule.register({
          secret: 'superSafe',
          signOptions: { expiresIn: '60s' },
        }),
      ],

      controllers: [AuthController],
      providers: [
        AuthService,
        AuthDatabaseService,
        AuthDatabaseController,
        AuthStrategy,
        JwtStrategy,
      ],
    }).compile();
    authDatabaseController = await mockModule.get<AuthDatabaseController>(
      AuthDatabaseController,
    );
    authDatabaseService = await mockModule.get<AuthDatabaseService>(
      AuthDatabaseService,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  test('hashed Password should be a truthy', async () => {
    mockUser.salt = await bcrypt.genSalt();
    const testResult = await authDatabaseController.hashPassword(mockUser);

    expect(testResult).toBeTruthy();
  });

  test('hashed Password should be falsy', async () => {
    mockUser.salt = '';
    await expect(
      authDatabaseController.hashPassword(mockUser),
    ).rejects.toThrowError();
  });

  test('test foundUser should be falsy', async () => {
    const foundUser = await authDatabaseController.findUser(mockUser);
    await expect(foundUser).toBeFalsy();
  });

  test('createUser should resolve', async () => {
    await jest
      .spyOn(authDatabaseService, 'findUser')
      .mockImplementation(async () => await Promise.resolve(undefined));

    const result = await authDatabaseController.createUser(mockUser);

    await expect(result.email).toContain(mockUser.email);
  });

  test('createUser should fail', async () => {
    const mockedUser: any = {
      email: 'blabla',
      password: 'blabla',
    };
    await jest
      .spyOn(authDatabaseService, 'findUser')
      .mockImplementation(async () => await Promise.resolve(mockedUser));

    await expect(async () => {
      await authDatabaseController.createUser(mockedUser);
    }).rejects.toThrow();
  });
});
