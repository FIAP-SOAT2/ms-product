
import request from 'supertest';
import setupApp from '../../main/config/app';
import { PrismaClient } from '@prisma/client';
import { product } from '../mock/product';
import { ProductRepository } from '../../infra/database/repositories/ProductRepository';

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn(() => ({
    product: {
      createProduct: jest.fn()
    },
  })),
}));
describe('Create product', () => {
  let server;
  let app;
  const productId = 1;

  beforeEach(async function () {
    app = setupApp();
    server = app.listen(3000, () => {});
  });
  afterEach(async function () {
    jest.clearAllMocks();
    server.close();
  });

    test('should return 400 when creating product with error', async () => {
      const response = await request(server).post('/api/product');
      expect(response.status).toBe(400);
    });

     test('should return 200 when creating product', async () => {
      jest.spyOn(ProductRepository.prototype, 'createProduct').mockResolvedValue();
      const response = await request(server).post('/api/product').send(product);
      expect(response.status).toBe(201);
    });
  });


