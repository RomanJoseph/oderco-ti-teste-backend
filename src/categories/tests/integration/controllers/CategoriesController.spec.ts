import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CategoriesModule } from 'src/infra/nestjs/categories/categories.module';

describe('CategoriesController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CategoriesModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/categories ((POST))', async () => {
    const response = await request(app.getHttpServer())
      .post('/categories')
      .send({ name: 'Category 1' });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Category 1');
    expect(response.body.id).toBeDefined();
    expect(response.body.createdAt).toBeDefined();
  });

  it('/categories ((GET))', async () => {
    const response = await request(app.getHttpServer()).get('/categories');

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});
