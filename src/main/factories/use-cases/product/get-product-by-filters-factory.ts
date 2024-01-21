import { ProductRepository } from '../../../../infra/database/repositories/ProductRepository';
import { GetProductByFiltersInterface } from '@application/interfaces/use-cases/product/GetProductByFiltersInterface';
import { GetProductByFilters } from '../../../../application/use-cases/product/GetProductByFilters';

export const makeGetProductByFilters = (): GetProductByFiltersInterface => {
  const productRepository = new ProductRepository();
  return new GetProductByFilters(productRepository);
};
