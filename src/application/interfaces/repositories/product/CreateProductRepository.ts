import { ProductEntity } from '@domain/entities/Product';
export interface CreateProductRepository {
  createProduct(productData: CreateProductRepository.Request): CreateProductRepository.Response;
}
export namespace CreateProductRepository {
  export type Request = Omit<ProductEntity, 'id' | 'created_at' | 'updated_at'>;
  export type Response = Promise<void>;
}
