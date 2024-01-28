import { BaseController } from '../../../../infra/http/controllers/BaseController';
import { CreateProductInterface } from '@application/interfaces/use-cases/product/CreateProductInterface';
import { HttpRequest } from '../../../../infra/http/interfaces/HttpRequest';
import { HttpResponse } from '../../../../infra/http/interfaces/HttpResponse';
import { Validation } from '../../../../infra/http/interfaces/Validation';

export class CreateProductController extends BaseController {
  constructor(
    private readonly createProductValidation: Validation,
    private readonly createProduct: CreateProductInterface,
  ) {
    super(createProductValidation);
  }

  async execute(httpRequest: CreateProductController.Request): Promise<CreateProductController.Response> {
    const { name, description, category, price, stock } = httpRequest.body;
    await this.createProduct.execute({ name, description, category, price, stock });
    return {
      statusCode: 201,
    };
  }
}

export namespace CreateProductController {
  export type Request = HttpRequest<CreateProductInterface.Request>;
  export type Response = HttpResponse<void>;
}
