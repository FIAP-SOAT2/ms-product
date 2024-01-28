import { IProductDomain, ProductEntity } from '@domain/entities/Product';

export interface UpdateProductRepository {
  updateProduct(params: UpdateProductRepository.Request): Promise<UpdateProductRepository.Response>;
}

export namespace UpdateProductRepository {
  export type Request = {
    productId: number;
    productData: Partial<Omit<IProductDomain, 'id' | 'createdAt' | 'updatedAt'>>;
  };
  export type Response = ProductEntity;
}
