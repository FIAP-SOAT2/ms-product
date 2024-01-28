import { ProductRepository } from '../../infra/database/repositories/ProductRepository';
import { prisma } from '../../infra/database/orm/prisma';
import { CreateProductRepository } from '../../application/interfaces/repositories/product/CreateProductRepository';
import { UpdateProductRepository } from '../../application/interfaces/repositories/product/UpdateProductRepository';
import { GetProductByFiltersRepository } from '../../application/interfaces/repositories/product/GetProductByFiltersRepository';
import { Decimal } from '@prisma/client/runtime/library';
import { GetProductsRepository } from '@application/interfaces/repositories/product/GetProductsRepository';
import { product } from '../mock/product';

jest.mock('@prisma/client', () => ({
    PrismaClient: jest.fn(() => ({
        product: {
            create: jest.fn(),
            update: jest.fn(),
            findMany: jest.fn(),
            count: jest.fn(),
            findUnique: jest.fn(),
            delete: jest.fn(),
        },
    })),
}));

describe('ProductRepository', () => {
    let productRepository: ProductRepository;

    beforeEach(() => {
        productRepository = new ProductRepository();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createProduct', () => {
        it('should create a product successfully', async () => {
            const productData: CreateProductRepository.Request = {
                name: 'Teste',
                description: 'teste',
                category: 1,
                price: new Decimal(10),
                stock: 0
            };
            await productRepository.createProduct(productData);
            expect(prisma.product.create).toHaveBeenCalledWith({
                data: {
                    name: productData.name,
                    description: productData.description,
                    price: productData.price,
                    stock: productData.stock,
                    category: productData.category,
                },
            });
        });
    });

    describe('updateProduct', () => {

        it('should update a product successfully', async () => {
            const params: UpdateProductRepository.Request = {
                productId: 0,
                productData: {}
            };

            await productRepository.updateProduct(params);
            expect(prisma.product.update).toHaveBeenCalledWith({
                where: { id: +params.productId },
                data: {
                    name: params.productData.name,
                    description: params.productData.description,
                    price: params.productData.price,
                    stock: params.productData.stock,
                    category: params.productData.category,
                },
            });
        });
    });

    describe('getProducts', () => {
        it('should get products successfully with pagination', async () => {
            const params: GetProductsRepository.Request = {
                page: 1,
                paginationLimit: 1
            };
            
            (prisma.product.findMany as jest.Mock).mockResolvedValueOnce(product);
            (prisma.product.count as jest.Mock).mockResolvedValueOnce(1);

            const result = await productRepository.getProducts(params);
            expect(prisma.product.findMany).toHaveBeenCalled();
            expect(prisma.product.count).toHaveBeenCalled();
            expect(result).toEqual({data: product, page:1, total:1, totalPages:1});
        });
    });


    describe('getProductById', () => {
        it('should get a product by ID successfully', async () => {
            const productId = 1;
            await productRepository.getProductById(productId);
            expect(prisma.product.findUnique).toHaveBeenCalledWith({
                where: { id: +productId },
            });
        });
    });

    describe('getProductByFilters', () => {
        it('should get products by filters successfully', async () => {
            const queryString: GetProductByFiltersRepository.Request = {
                category: 1
            }
            await productRepository.getProductByFilters(queryString);
            expect(prisma.product.findMany).toHaveBeenCalledWith({
                where: { category: queryString.category },
            });
        });
    });

    describe('deleteProduct', () => {
        it('should delete a product successfully', async () => {
            const productId = 1;
            await productRepository.deleteProduct(productId);
            expect(prisma.product.delete).toHaveBeenCalledWith({
                where: { id: +productId },
            });
        });
    });
});
