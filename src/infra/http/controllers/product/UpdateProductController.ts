import { BaseController } from '../../../../infra/http/controllers/BaseController';
import { GetProductByIdInterface } from '@application/interfaces/use-cases/product/GetProductByIdInterface';
import { UpdateProductInterface } from '@application/interfaces/use-cases/product/UpdateProductInterface';
import { ProductNotFoundError } from '../../../../application/errors/product/ProductNotFoundError';
import { notFound, ok } from '../../../../infra/http/helpers/http';
import { HttpRequest } from '../../../../infra/http/interfaces/HttpRequest';
import { HttpResponse } from '@infra/http/interfaces/HttpResponse';
import { Validation } from '@infra/http/interfaces/Validation';

export class UpdateProductController extends BaseController {
  constructor(
    private readonly updateProductValidation: Validation,
    private readonly getProductById: GetProductByIdInterface,
    private readonly updateProduct: UpdateProductInterface,
  ) {
    super(updateProductValidation);
  }

  async execute(httpRequest: UpdateProductController.Request): Promise<HttpResponse> {
    const { id } = httpRequest.params;
    const { name, description, category, price, stock } = httpRequest.body;

    const productOrError = await this.getProductById.execute(+id);
    if (productOrError instanceof ProductNotFoundError) {
      return notFound(productOrError);
    }

    const updateProductOrError = await this.updateProduct.execute({
      productId: id,
      productData: {
        name,
        description,
        category,
        price,
        stock,
      },
    });

    if (updateProductOrError instanceof ProductNotFoundError) {
      return notFound(updateProductOrError);
    }

    return ok(updateProductOrError);
  }
}

export namespace UpdateProductController {
  export type Request = HttpRequest<UpdateProductInterface.ProductDataType, { id: number }>;
  export type Response = HttpRequest<UpdateProductInterface.Response | ProductNotFoundError>;
}
