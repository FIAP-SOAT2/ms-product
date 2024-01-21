import { UpdateProductInterface } from '@application/interfaces/use-cases/product/UpdateProductInterface';
import { ProductRepository } from '../../../../infra/database/repositories/ProductRepository';
import { UpdateProduct } from '../../../../application/use-cases/product/UpdateProduct';

export const makeUpdateProduct = (): UpdateProductInterface => {
  const productRepository = new ProductRepository();
  return new UpdateProduct(productRepository, productRepository);
};
