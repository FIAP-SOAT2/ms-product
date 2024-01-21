import { Router } from 'express';
import { expressRouteAdapter } from '../../main/adapters/express-route-adapter';
import { makeCreateProductController } from '../../main/factories/controllers/product/create-product/controller.factory';
import { makeGetProductsController } from '../../main/factories/controllers/product/get-product/controller.factory';
import { MakeGetProductByIdController } from '../../main/factories/controllers/product/get-product-by-id/controller.factory';
import { makeGetProductByFiltersController } from '../../main/factories/controllers/product/get-product-by-filters/controller.factory';
import { makeDeleteProductController } from '../../main/factories/controllers/product/delete-product/controller.factory';
import { makeUpdateProductController } from '../../main/factories/controllers/product/update-product/controller.factory';

export default (router: Router): void => {
  router.post('/product/', expressRouteAdapter(makeCreateProductController()));
  router.get('/product/', expressRouteAdapter(makeGetProductsController()));
  router.get('/product/filters', expressRouteAdapter(makeGetProductByFiltersController()));
  router.get('/product/:id', expressRouteAdapter(MakeGetProductByIdController()));
  router.patch('/product/:id', expressRouteAdapter(makeUpdateProductController()));
  router.delete('/product/:id', expressRouteAdapter(makeDeleteProductController()));
};
