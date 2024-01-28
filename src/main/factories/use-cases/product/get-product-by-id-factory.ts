import { GetProductByIdInterface } from '@application/interfaces/use-cases/product/GetProductByIdInterface';
import { ProductRepository } from '../../../../infra/database/repositories/ProductRepository';
import { GetProductById } from '../../../../application/use-cases/product/GetProductById';

export const makeGetProductById = (): GetProductByIdInterface => {
  const productRepository = new ProductRepository();
  return new GetProductById(productRepository);
};
