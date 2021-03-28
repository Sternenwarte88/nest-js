import * as bcrypt from 'bcrypt';
import { User, UserSchema } from '../../../auth/schema/user.schema';
import { AuthService } from '../../../auth/auth.service';
import { Test } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from '../../../auth/auth.controller';
import { AuthStrategy } from '../../../auth/strategies/auth.strategie';
import { JwtStrategy } from '../../../auth/strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { UserSchemaDto } from '../../../auth/dto/user-schema.dto';
import { DatabaseController } from '../../../database/database.controller';
import { DatabaseModule } from '../../../database/database.module';

describe('Authentification Database actions testsuite', () => {
  let databaseController: DatabaseController;

  const mockUser: UserSchemaDto = {
    email: 'blabla',
    password: 'blabla',
  };
  beforeEach(async () => {
    const mockModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(process.env.MONGO_URL),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        DatabaseModule,
        JwtModule.register({
          secret: 'superSafe',
          signOptions: { expiresIn: '60s' },
        }),
      ],

      controllers: [AuthController],
      providers: [AuthService, DatabaseController, AuthStrategy, JwtStrategy],
    }).compile();
    databaseController = await mockModule.get<DatabaseController>(
      DatabaseController,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('hashed Password should be a truthy', async () => {
    const testsalt = await bcrypt.genSalt();
    const testResult = await databaseController.hashPassword(
      mockUser.password,
      testsalt,
    );

    expect(testResult).toBeTruthy();
  });

  // test('hashed Password should be falsy', async () => {
  //   const testsalt = undefined;

  //   await expect(
  //     DatabaseController.hashPassword(mockUser.password, testsalt),
  //   ).rejects.toThrowError();
  // });

  // test('test foundUser should be falsy', async () => {
  //   const foundUser = await databaseController.findUser(mockUser);
  //   await expect(foundUser).toBeFalsy();
  // });

  // test('findUser should throw exception', async () => {
  //   expect(async () => {
  //     await databaseController.findUser('');
  //   }).rejects.toThrowError();
  // });

  // test('createUser should resolve', async () => {
  //   await jest
  //     .spyOn(databaseController, 'findUser')
  //     .mockImplementation((mockUser) => Promise.resolve(''));

  //   const result = await databaseController.createUser(mockUser);

  //   await expect(result.email).toContain(mockUser.email);
  // });

  // test('createUser should fail', async () => {
  //   await jest
  //     .spyOn(databaseController, 'findUser')
  //     .mockImplementation(async (mockUser) => await Promise.resolve(mockUser));

  //   await expect(async () => {
  //     await databaseController.createUser(mockUser);
  //   }).rejects.toThrow(ConflictException);
  // });
});
