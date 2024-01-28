import { DeleteProductInterface } from '@application/interfaces/use-cases/product/DeleteProductInterface';
import { DeleteProductRepository } from '@application/interfaces/repositories/product/DeleteProductRepository';

export class DeleteProduct implements DeleteProductInterface {
  constructor(private readonly deleteProductRepository: DeleteProductRepository) {}

  async execute(productId: DeleteProductInterface.Request): Promise<DeleteProductInterface.Response> {
    await this.deleteProductRepository.deleteProduct(productId);
  }
}
