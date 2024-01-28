import { BaseController } from '../../../../../infra/http/controllers/BaseController';
import { GetProductByIdController } from '../../../../../infra/http/controllers/product/GetProductByIdController';
import { makeGetProductById } from '../../../../../main/factories/use-cases/product/get-product-by-id-factory';

export const MakeGetProductByIdController = (): BaseController => {
  const useCase = makeGetProductById();
  return new GetProductByIdController(useCase);
};
