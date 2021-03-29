import { MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { User, UserSchema } from '../auth/schema/user.schema';
import { DatabaseService } from './auth_database.service';

describe('DatabaseService', () => {
  let databaseService: DatabaseService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(process.env.MONGO_URL),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ], // Add
      controllers: [], // Add
      providers: [DatabaseService], // Add
    }).compile();

    databaseService = moduleRef.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    expect(databaseService).toBeDefined();
  });
});
