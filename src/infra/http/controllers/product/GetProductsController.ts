import { HttpRequest } from '../../interfaces/HttpRequest';
import { HttpResponse } from '../../interfaces/HttpResponse';
import { BaseController } from '../BaseController';
import { GetProductsInterface } from '@application/interfaces/use-cases/product/GetProductsInterface';
import { ok } from '../../../http/helpers/http';

export class GetProductsController extends BaseController {
  constructor(private readonly getProducts: GetProductsInterface) {
    super();
  }

  async execute(httpRequest: GetProductsController.Request): Promise<GetProductsController.Response> {
    const { page } = httpRequest.params!;
    const response = await this.getProducts.execute({ page });
    return ok(response);
  }
}

export namespace GetProductsController {
  export type Request = HttpRequest<undefined, { page?: number }>;
  export type Response = HttpResponse<GetProductsInterface.Response>;
}
