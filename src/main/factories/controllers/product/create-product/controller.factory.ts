import { BaseController } from '../../../../../infra/http/controllers/BaseController';
import { CreateProductController } from '../../../../../infra/http/controllers/product/CreateProductController';
import { makeCreateProduct } from '../../../../../main/factories/use-cases/product/create-product-factory';
import { makeCreateProductValidation } from '../../../../../main/factories/controllers/product/create-product/validation-factory';

export const makeCreateProductController = (): BaseController => {
  const validation = makeCreateProductValidation();
  const createProductUseCase = makeCreateProduct();
  const data = new CreateProductController(validation, createProductUseCase);
  return data;
};
