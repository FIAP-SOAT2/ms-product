import { GetProductsInterface } from '@application/interfaces/use-cases/product/GetProductsInterface';
import { GetProductsRepository } from '../../interfaces/repositories/product/GetProductsRepository';
import { paginationConfig } from '../../config/pagination';

export class GetProducts implements GetProductsInterface {
  constructor(private readonly getProductsRepository: GetProductsRepository) {}

  async execute(params: GetProductsInterface.Request): Promise<GetProductsInterface.Response> {
    const { page = 1 } = params;
    const { paginationLimit } = paginationConfig;
    return this.getProductsRepository.getProducts({
      page,
      paginationLimit,
    });
  }
}
