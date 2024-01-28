import { UseCase } from '../UseCase';
import { ProductNotFoundError } from '../../../errors/product/ProductNotFoundError';
import { IProductDomain, ProductEntity } from '../../../../domain/entities/Product';

export interface UpdateProductInterface extends UseCase<UpdateProductInterface.Request, UpdateProductInterface.Response> {
  execute(params: UpdateProductInterface.Request): Promise<UpdateProductInterface.Response>;
}

export namespace UpdateProductInterface {
  export type ProductIdType = number;
  export type ProductDataType = Partial<Omit<IProductDomain, 'id' | 'createdAt' | 'updatedAt'>>;
  export type Request = { productId: ProductIdType; productData: ProductDataType };
  export type Response = ProductEntity | ProductNotFoundError;
}
