import { GetProducts } from '../../../../application/use-cases/product/GetProducts';
import { GetProductsInterface } from '@application/interfaces/use-cases/product/GetProductsInterface';
import { ProductRepository } from '../../../../infra/database/repositories/ProductRepository';

export const makeGetProducts = (): GetProductsInterface => {
  const productRepository = new ProductRepository();
  return new GetProducts(productRepository);
};
