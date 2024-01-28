import { BaseController } from '../../../../infra/http/controllers/BaseController';
import { GetProductByIdInterface } from '@application/interfaces/use-cases/product/GetProductByIdInterface';
import { DeleteProductInterface } from '@application/interfaces/use-cases/product/DeleteProductInterface';
import { HttpRequest } from '../../../../infra/http/interfaces/HttpRequest';
import { HttpResponse } from '../../../../infra/http/interfaces/HttpResponse';
import { ProductNotFoundError } from '../../../../application/errors/product/ProductNotFoundError';
import { noContent, notFound } from '../../../../infra/http/helpers/http';

export class DeleteProductController extends BaseController {
  constructor(
    private readonly getProductById: GetProductByIdInterface,
    private readonly deleteProduct: DeleteProductInterface,
  ) {
    super();
  }

  async execute(httpRequest: DeleteProductController.Request): Promise<DeleteProductController.Response> {
    const { id } = httpRequest.params;
    const productOrError = await this.getProductById.execute(id);

    if (productOrError instanceof ProductNotFoundError) {
      return notFound(productOrError);
    }

    await this.deleteProduct.execute(id);
    return noContent();
  }
}

export namespace DeleteProductController {
  export type Request = HttpRequest<undefined, { id: number }>;
  export type Response = HttpResponse<undefined | ProductNotFoundError>;
}
