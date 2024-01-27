
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

  describe('Create product', () => {
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

  describe('Get product', () => {
    test('should return 200 on successfully getting product by id', async () => {
      jest.spyOn(ProductRepository.prototype, 'getProductById').mockResolvedValue(product);
      const response = await request(server).get('/api/product/1');
      expect(response.status).toBe(200);
    });

    test('should return 200 on successfully getting users', async () => {
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
  });

  describe('Update user', () => {
    test('should return 200 when product updated successfully', async () => {
      jest.spyOn(ProductRepository.prototype, 'getProductById').mockResolvedValue(product);
      jest.spyOn(ProductRepository.prototype, 'updateProduct').mockResolvedValue(product);
      const response = await request(server).patch(`/api/product/${productId}`).send(product);
      expect(response.status).toBe(200);
    });
  });

  describe('Delete user', () => {
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

});
