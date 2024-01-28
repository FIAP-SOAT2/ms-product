

import request from 'supertest';
import setupApp from '../../main/config/app';
import { PrismaClient } from '@prisma/client';
import { product } from '../mock/product';
import { ProductRepository } from '../../infra/database/repositories/ProductRepository';
import { EnumValidatorAdapter } from '../../infra/http/validators/EnumValidatorAdapter';

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn(() => ({
    product: {
      createProduct: jest.fn(),
      getProductByFilters: jest.fn()
    },
  })),
}));
describe('Get product', () => {
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

    test('should return 200 on successfully getting product by id', async () => {
      jest.spyOn(ProductRepository.prototype, 'getProductById').mockResolvedValue(product);
      const response = await request(server).get('/api/product/1');
      expect(response.status).toBe(200);
    });

    test('should return 200 on successfully getting products', async () => {
      jest.spyOn(ProductRepository.prototype, 'getProducts').mockResolvedValue({
        data: [product],
        page: 1,
        total: 1,
        totalPages: 1,
      });
      const response = await request(server).get(`/api/product`);
      expect(response.status).toBe(200);
    });

    test('should return 400 for product not found', async () => {
      jest.spyOn(ProductRepository.prototype, 'getProductById').mockResolvedValue(null);
      const response = await request(server).get(`/api/product/${productId}`);
      expect(response.status).toBe(404);
      expect(response.body.error).toBe('The Product was not found');
    });

    test('should return 400 for products not found by filters', async () => {
      jest.spyOn(ProductRepository.prototype, 'getProductByFilters').mockResolvedValue(null);
      const response = await request(server).get(`/api/product/filters`);
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Missing param: category');
    });

    test('should return 200 for products', async () => {
      jest.spyOn(ProductRepository.prototype, 'getProductByFilters').mockResolvedValue([product]);
      jest.spyOn(EnumValidatorAdapter.prototype, 'isValid').mockReturnValue(true);

      const response = await request(server).get(`/api/product/filters?category=1`);
      expect(response.status).toBe(200);
    });
  });
