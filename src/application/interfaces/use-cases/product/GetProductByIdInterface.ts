import { UseCase } from '@application/interfaces/use-cases/UseCase';
import { ProductEntity } from '../../../../domain/entities/Product';
import { ProductNotFoundError } from '../../../../application/errors/product/ProductNotFoundError';

export interface GetProductByIdInterface extends UseCase<GetProductByIdInterface.Request, GetProductByIdInterface.Response> {
  execute(productId: GetProductByIdInterface.Request): Promise<GetProductByIdInterface.Response>;
}

export namespace GetProductByIdInterface {
  export type Request = number;
  export type Response = ProductEntity | ProductNotFoundError;
}
