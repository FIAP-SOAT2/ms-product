import { ProductEntity } from '@domain/entities/Product';
import { CategoryEnum } from '@domain/enum/ProductEnum';

export interface GetProductByFiltersRepository {
  getProductByFilters(queryString: GetProductByFiltersRepository.Request): Promise<GetProductByFiltersRepository.Response>;
}

export namespace GetProductByFiltersRepository {
  export type Request = { category: CategoryEnum };
  export type Response = ProductEntity[] | null;
}
