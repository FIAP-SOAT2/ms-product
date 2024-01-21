import { CreateProductInterface } from '@application/interfaces/use-cases/product/CreateProductInterface';
import { ProductRepository } from '../../../../infra/database/repositories/ProductRepository';
import { CreateProduct } from '../../../../application/use-cases/product/CreateProduct';

export const makeCreateProduct = (): CreateProductInterface => {
  const productRepository = new ProductRepository();
  return new CreateProduct(productRepository);
};
