
import { GetProductByFiltersRepository } from '../../application/interfaces/repositories/product/GetProductByFiltersRepository';
import { GetProductByFilters } from '../../application/use-cases/product/GetProductByFilters';

import { product } from '../mock/product';
import { ProductNotFoundError } from '../../application/errors/product/ProductNotFoundError';
import { GetProductByFiltersInterface } from '../../application/interfaces/use-cases/product/GetProductByFiltersInterface';

class MockGetProductByFiltersRepository implements GetProductByFiltersRepository {
  getProductByFilters(queryString: GetProductByFiltersRepository.Request): Promise<any> {
    return Promise.resolve(product);
  }
}

describe('GetProductByFilters', () => {
  let getProductByFilters: GetProductByFilters;
  let mockRepository: MockGetProductByFiltersRepository;

  beforeEach(() => {
    mockRepository = new MockGetProductByFiltersRepository();
    getProductByFilters = new GetProductByFilters(mockRepository);
  });

  it('should return a product when found', async () => {
    const queryString: GetProductByFiltersInterface.Request = {}
    const result = await getProductByFilters.execute(queryString);
    expect(result).toBe(product)
  });

  it('should return ProductNotFoundError when no product is found', async () => {
    mockRepository.getProductByFilters = jest.fn(() => Promise.resolve(null));

    const queryString: GetProductByFiltersInterface.Request  = {}
    const result = await getProductByFilters.execute(queryString);

    expect(result).toBeInstanceOf(ProductNotFoundError);
  });
});
