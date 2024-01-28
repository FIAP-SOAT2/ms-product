import { UpdateProductInterface } from '@application/interfaces/use-cases/product/UpdateProductInterface';
import { GetProductByIdRepository } from '../../../application/interfaces/repositories/product/GetProductByIdRepository';
import { UpdateProductRepository } from '../../../application/interfaces/repositories/product/UpdateProductRepository';
import { ProductNotFoundError } from '../../../application/errors/product/ProductNotFoundError';

export class UpdateProduct implements UpdateProductInterface {
  constructor(
    private readonly getProductByIdRepository: GetProductByIdRepository,
    private readonly updateProductRepository: UpdateProductRepository,
  ) {}

  async execute(params: UpdateProductInterface.Request): Promise<UpdateProductInterface.Response> {
    const { productId, productData } = params;
    const product = await this.getProductByIdRepository.getProductById(productId);

    if (!product) {
      return new ProductNotFoundError();
    }

    return this.updateProductRepository.updateProduct({ productId, productData });
  }
}
