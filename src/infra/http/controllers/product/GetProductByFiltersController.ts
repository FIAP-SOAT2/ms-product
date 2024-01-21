import { BaseController } from '../../../../infra/http/controllers/BaseController';
import { HttpRequest } from '../../../../infra/http/interfaces/HttpRequest';
import { HttpResponse } from '../../../../infra/http/interfaces/HttpResponse';
import { notFound, ok } from '../../../../infra/http/helpers/http';
import { CategoryEnum } from '@domain/enum/ProductEnum';
import { ProductNotFoundError } from '../../../../application/errors/product/ProductNotFoundError';
import { GetProductByFiltersInterface } from '@application/interfaces/use-cases/product/GetProductByFiltersInterface';
import { Validation } from '@infra/http/interfaces/Validation';

export class GetProductByFiltersController extends BaseController {
  constructor(
    private readonly getProductByFiltersValidation: Validation,
    private readonly getProductByFilters: GetProductByFiltersInterface,
  ) {
    super(getProductByFiltersValidation);
  }

  async execute(httpRequest: GetProductByFiltersController.Request): Promise<GetProductByFiltersController.Response> {
    const { category } = httpRequest.query!;
    const productOrError = await this.getProductByFilters.execute({ category });

    if (productOrError instanceof ProductNotFoundError) {
      return notFound(productOrError);
    }

    return ok(productOrError);
  }
}

export namespace GetProductByFiltersController {
  export type Request = HttpRequest<undefined, { category: CategoryEnum }>;
  export type Response = HttpResponse<GetProductByFiltersInterface.Response>;
}
