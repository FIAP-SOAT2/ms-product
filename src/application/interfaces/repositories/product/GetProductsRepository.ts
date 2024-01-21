import { ProductEntity } from '@domain/entities/Product';

export interface GetProductsRepository {
  getProducts(params: GetProductsRepository.Request): Promise<GetProductsRepository.Response>;
}

export namespace GetProductsRepository {
  export type Request = { page: number; paginationLimit: number };
  export type Response = { data: ProductEntity[]; page: number; total: number; totalPages: number };
}
