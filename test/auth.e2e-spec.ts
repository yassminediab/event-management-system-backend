import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import {randomStringGenerator} from "@nestjs/common/utils/random-string-generator.util";

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Test Register with happy scenario', () => {
    return request(app.getHttpServer())
      .post('/auth/register').send({name: 'Yassmine' , email: `${randomStringGenerator()}@gmail.com`, password: '123456'})
      .expect(201);
  });
});
