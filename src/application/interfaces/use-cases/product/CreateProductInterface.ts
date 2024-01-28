import { UseCase } from '@application/interfaces/use-cases/UseCase';
import { ProductEntity } from '@domain/entities/Product';

export interface CreateProductInterface extends UseCase<CreateProductInterface.Request, CreateProductInterface.Response> {
  execute(ProductData: CreateProductInterface.Request): Promise<CreateProductInterface.Response>;
}

export namespace CreateProductInterface {
  export type Request = Omit<ProductEntity, 'id' | 'created_at' | 'updated_at'>;
  export type Response = void;
}
