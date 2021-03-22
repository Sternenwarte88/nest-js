import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { UserDocument } from 'src/mh_backend/auth/schema/user.schema';
import { AuthDbActions } from '../../../auth/authDbActions/authDb.actions';
describe('Authentification Database actions testsuite', () => {
  let authDbActions: AuthDbActions;
  let userModel: Model<UserDocument>;
  beforeEach(() => {
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
  test('hashed Password should be falsy', async () => {
    const testData = 'test';
    const testsalt = undefined;

    await expect(
      authDbActions.hashPassword(testData, testsalt),
    ).rejects.toThrowError();
  });
});
