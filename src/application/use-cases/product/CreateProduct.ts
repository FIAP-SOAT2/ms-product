import { CreateProductInterface } from '@application/interfaces/use-cases/product/CreateProductInterface';
import { CreateProductRepository } from '@application/interfaces/repositories/product/CreateProductRepository';

export class CreateProduct implements CreateProductInterface {
  constructor(private readonly createProductRepository: CreateProductRepository) {}

  async execute(productData: CreateProductInterface.Request): Promise<CreateProductInterface.Response> {
    await this.createProductRepository.createProduct({
      ...productData,
    });
  }
}
