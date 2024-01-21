import { HttpRequest } from '../../../../infra/http/interfaces/HttpRequest';
import { HttpResponse } from '../../../../infra/http/interfaces/HttpResponse';
import { notFound, ok } from '../../../../infra/http/helpers/http';
import { BaseController } from '../../../../infra/http/controllers/BaseController';
import { ProductNotFoundError } from '../../../../application/errors/product/ProductNotFoundError';
import { GetProductByIdInterface } from '@application/interfaces/use-cases/product/GetProductByIdInterface';

export class GetProductByIdController extends BaseController {
  constructor(private readonly getProductById: GetProductByIdInterface) {
    super();
  }

  async execute(httpRequest: GetProductByIdController.Request): Promise<GetProductByIdController.Response> {
    const { id } = httpRequest.params;
    const productOrError = await this.getProductById.execute(id);

    if (productOrError instanceof ProductNotFoundError) {
      return notFound(productOrError);
    }
    return ok(productOrError);
  }
}

export namespace GetProductByIdController {
  export type Request = HttpRequest<undefined, { id: number }>;
  export type Response = HttpResponse<GetProductByIdInterface.Response>;
}
