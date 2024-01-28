import { BaseController } from '../../../../../infra/http/controllers/BaseController';
import { GetProductsController } from '../../../../../infra/http/controllers/product/GetProductsController';
import { makeGetProducts } from '../../../../../main/factories/use-cases/product/get-products-factory';

export const makeGetProductsController = (): BaseController => {
  const useCase = makeGetProducts();
  return new GetProductsController(useCase);
};
