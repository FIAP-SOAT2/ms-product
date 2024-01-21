import { GetProductByIdInterface } from '@application/interfaces/use-cases/product/GetProductByIdInterface';
import { GetProductByIdRepository } from '../../../application/interfaces/repositories/product/GetProductByIdRepository';
import { ProductNotFoundError } from '../../../application/errors/product/ProductNotFoundError';

export class GetProductById implements GetProductByIdInterface {
  constructor(private readonly getProductByIdRepository: GetProductByIdRepository) {}

  async execute(productId: GetProductByIdInterface.Request): Promise<GetProductByIdInterface.Response> {
    const product = await this.getProductByIdRepository.getProductById(productId);

    if (!product) {
      return new ProductNotFoundError();
    }

    return product;
  }
}
