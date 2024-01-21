import { UseCase } from '../UseCase';
import { ProductNotFoundError } from '../../../errors/product/ProductNotFoundError';
import { ProductEntity } from '@domain/entities/Product';
import { CategoryEnum } from '@domain/enum/ProductEnum';

export interface GetProductByFiltersInterface extends UseCase<GetProductByFiltersInterface.Request, GetProductByFiltersInterface.Response> {
  execute(queryString: GetProductByFiltersInterface.Request): Promise<GetProductByFiltersInterface.Response>;
}

export namespace GetProductByFiltersInterface {
  export type Request = { category?: CategoryEnum };
  export type Response = ProductEntity[] | ProductNotFoundError;
}
