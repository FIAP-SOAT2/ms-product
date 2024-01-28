import { DeleteProductInterface } from '@application/interfaces/use-cases/product/DeleteProductInterface';
import { ProductRepository } from '../../../../infra/database/repositories/ProductRepository';
import { DeleteProduct } from '../../../../application/use-cases/product/DeleteProduct';

export const makeDeleteProduct = (): DeleteProductInterface => {
  const productRepository = new ProductRepository();
  return new DeleteProduct(productRepository);
};
