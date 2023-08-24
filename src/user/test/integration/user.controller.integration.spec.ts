import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';

import { userStub } from '../consts/user.const';
import * as request from 'supertest';
import { DatabaseModule } from '../../../database/database.module';

describe('UserController', () => {
  let httpServer: any;
  let app: any;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
    }).compile();
    app = moduleFixture.createNestApplication();

    await app.init();

    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const response = await request(httpServer).post('/user').send(userStub());

      expect(response.status).toBe(201);
    });
  });

  describe('getUser', () => {
    it('should get a user', async () => {
      const response = await request(httpServer).get('/user');
      console.log(response.body);

      expect(response.status).toBe(200);
      expect(response.body.length).toEqual(1);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
