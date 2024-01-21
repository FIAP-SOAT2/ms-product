import { BaseController } from '../../../../../infra/http/controllers/BaseController';
import { makeGetProductById } from '../../../../../main/factories/use-cases/product/get-product-by-id-factory';
import { DeleteProductController } from '../../../../../infra/http/controllers/product/DeleteProductController';
import { makeDeleteProduct } from '../../../../../main/factories/use-cases/product/delete-product-factory';

export const makeDeleteProductController = (): BaseController => {
  const getProductByIdUseCase = makeGetProductById();
  const deleteProductUseCase = makeDeleteProduct();

  return new DeleteProductController(getProductByIdUseCase, deleteProductUseCase);
};
