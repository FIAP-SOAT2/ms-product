import { BaseController } from '../../../../../infra/http/controllers/BaseController';
import { makeGetProductById } from '../../../use-cases/product/get-product-by-id-factory';
import { makeUpdateProduct } from '../../../use-cases/product/update-product-factory';
import { UpdateProductController } from '../../../../../infra/http/controllers/product/UpdateProductController';
import { makeUpdateProductValidation } from '../../../../../main/factories/controllers/product/update-product/validation-factory';

export const makeUpdateProductController = (): BaseController => {
  const validation = makeUpdateProductValidation();
  const getProductByIdUseCase = makeGetProductById();
  const updateProductUseCase = makeUpdateProduct();
  return new UpdateProductController(validation, getProductByIdUseCase, updateProductUseCase);
};
