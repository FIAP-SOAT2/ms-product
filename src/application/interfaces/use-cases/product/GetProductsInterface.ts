import { ProductEntity } from '@domain/entities/Product';
import { UseCase } from '../UseCase';

export interface GetProductsInterface extends UseCase<GetProductsInterface.Request, GetProductsInterface.Response> {
  execute(params: GetProductsInterface.Request): Promise<GetProductsInterface.Response>;
}

export namespace GetProductsInterface {
  export type Request = { page?: number };
  export type Response = { data: ProductEntity[]; page: number; total: number; totalPages: number };
}
