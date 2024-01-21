import { BaseController } from '../../../../../infra/http/controllers/BaseController';
import { GetProductByFiltersController } from '../../../../../infra/http/controllers/product/GetProductByFiltersController';
import { makeGetProductByFilters } from '../../../use-cases/product/get-product-by-filters-factory';
import { makeGetProductByFiltersValidation } from '../../../../../main/factories/controllers/product/get-product-by-filters/validation-factory';

export const makeGetProductByFiltersController = (): BaseController => {
  const validation = makeGetProductByFiltersValidation();
  const useCase = makeGetProductByFilters();
  return new GetProductByFiltersController(validation, useCase);
};
