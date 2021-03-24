import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { UserDocument } from '../../../auth/schema/user.schema';
import { AuthDbActions } from '../../../auth/authDbActions/authDb.actions';
import { MongoClient } from 'mongodb';
import { UserSchemaDto } from 'src/mh_backend/auth/dto/user-schema.dto';

describe('Authentification Database actions testsuite', () => {
  let authDbActions: AuthDbActions;
  let userModel: Model<UserDocument>;

  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db(process.env.__MONGO_DB_NAME__);
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  beforeEach(async () => {
    authDbActions = new AuthDbActions(userModel);
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

  test('hashed Password should throw error', async () => {
    const testData = 'test';
    const testsalt = undefined;

    await expect(
      authDbActions.hashPassword(testData, testsalt),
    ).rejects.toThrowError();
  });

  test('findUser should give back mockedUser', async () => {
    const mockedUser: UserSchemaDto = {
      email: 'test@test.de',
      password: 'testPwd',
    };

    await authDbActions.findUser(mockedUser);
  });
});
