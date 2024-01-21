import { ProductNotFoundError } from '../../errors/product/ProductNotFoundError';
import { GetProductByFiltersRepository } from '../../interfaces/repositories/product/GetProductByFiltersRepository';
import { GetProductByFiltersInterface } from '@application/interfaces/use-cases/product/GetProductByFiltersInterface';

export class GetProductByFilters implements GetProductByFiltersInterface {
  constructor(private readonly getProductByFiltersRepository: GetProductByFiltersRepository) {}

  async execute(queryString: GetProductByFiltersInterface.Request): Promise<GetProductByFiltersInterface.Response> {
    const { category } = queryString;
    const product = await this.getProductByFiltersRepository.getProductByFilters({ category });

    if (!product) {
      return new ProductNotFoundError();
    }

    return product;
  }
}
