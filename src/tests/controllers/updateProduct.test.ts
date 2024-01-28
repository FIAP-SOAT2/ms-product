
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
describe('Controller', () => {
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

describe('Update product', () => {
    test('should return 200 when product updated successfully', async () => {
      jest.spyOn(ProductRepository.prototype, 'getProductById').mockResolvedValue(product);
      jest.spyOn(ProductRepository.prototype, 'updateProduct').mockResolvedValue(product);
      const response = await request(server).patch(`/api/product/${productId}`).send(product);
      expect(response.status).toBe(200);
    });
  });

});