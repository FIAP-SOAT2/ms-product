import { ProductEntity } from '@domain/entities/Product';

export interface GetProductByIdRepository {
  getProductById(ProductId: number): Promise<GetProductByIdRepository.Response>;
}

export namespace GetProductByIdRepository {
  export type Response = ProductEntity | null;
}
