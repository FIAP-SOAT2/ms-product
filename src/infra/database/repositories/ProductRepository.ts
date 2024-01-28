import { CreateProductRepository } from '@application/interfaces/repositories/product/CreateProductRepository';
import { GetProductsRepository } from '@application/interfaces/repositories/product/GetProductsRepository';
import { GetProductByIdRepository } from '@application/interfaces/repositories/product/GetProductByIdRepository';
import { GetProductByFiltersRepository } from '@application/interfaces/repositories/product/GetProductByFiltersRepository';
import { DeleteProductRepository } from '@application/interfaces/repositories/product/DeleteProductRepository';
import { UpdateProductRepository } from '@application/interfaces/repositories/product/UpdateProductRepository';
import { ProductEntity } from '@domain/entities/Product';
import { prisma } from '../../../infra/database/orm/prisma';
import { product_category_enum } from '@prisma/client';

export class ProductRepository implements CreateProductRepository, GetProductsRepository, GetProductByIdRepository, GetProductByFiltersRepository, DeleteProductRepository, UpdateProductRepository {
  async createProduct(productData: CreateProductRepository.Request): Promise<void> {
    await prisma.product.create({
      data: {
        name: productData.name,
        description: productData.description,
        price: productData.price,
        stock: productData.stock,
        category: productData.category as product_category_enum,
      },
    });
  }

  updateProduct(params: UpdateProductRepository.Request): Promise<ProductEntity> {
    const { name, description, price, stock, category } = params.productData;
    return prisma.product.update({
      where: { id: +params.productId },
      data: {
        name,
        description,
        price,
        stock,
        category: category as product_category_enum,
      },
    });
  }

  async getProducts(params: GetProductsRepository.Request): Promise<GetProductsRepository.Response> {
    const { page, paginationLimit } = params;
    const data = await prisma.product.findMany();
    const total = await prisma.product.count();
    const totalPages = Math.ceil(total / paginationLimit);
    return { data, page, total, totalPages };
  }

  async getProductById(ProductId: number): Promise<ProductEntity> {
    try {
      const data = await prisma.product.findUnique({
        where: { id: +ProductId },
      });
      return data;
    } catch (error) {}
  }

  async getProductByFilters(queryString: GetProductByFiltersRepository.Request): Promise<ProductEntity[]> {
    const { category } = queryString;
    const data = await prisma.product.findMany({
      where: { category: category as unknown as product_category_enum },
    });
    return data;
  }

  async deleteProduct(productId: number): Promise<void> {
    await prisma.product.delete({
      where: { id: +productId },
    });
  }
}
