
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
describe('Delete user', () => {
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

    test('should return 201 when deleted product successfully', async () => {
      jest.spyOn(ProductRepository.prototype, 'getProductById').mockResolvedValue(product);
      jest.spyOn(ProductRepository.prototype, 'deleteProduct').mockResolvedValue();
      const response = await request(server).delete(`/api/product/${productId}`).send(product);
      expect(response.status).toBe(204);
    });
    test('should return 400 when deleted product not found', async () => {
      jest.spyOn(ProductRepository.prototype, 'getProductById').mockResolvedValue(null);
      const response = await request(server).delete(`/api/product/${product}`).send(product);
      expect(response.status).toBe(404);
    });
  });

