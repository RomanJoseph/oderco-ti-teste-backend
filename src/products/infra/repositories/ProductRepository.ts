import { Injectable } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { PrismaProvider } from 'src/infra/prisma/provider/PrismaProvider';
import { ProductWithCategories } from 'src/infra/prisma/types/ProductWithCategories';
import { CreateProductDTO } from 'src/products/dtos/CreateProductDTO';

@Injectable()
export class ProductRepository {
  constructor(private readonly prisma: PrismaProvider) {}

  public async create(
    dto: CreateProductDTO,
    prismaTransaction?: Prisma.TransactionClient,
  ): Promise<ProductWithCategories> {
    const prismaClient = prismaTransaction || this.prisma;

    return prismaClient.product.create({
      data: {
        name: dto.name,
        price: dto.price,
        categories: {
          connect: dto.categoryIds.map((categoryId) => ({ id: categoryId })),
        },
      },
      include: {
        categories: true,
      },
    });
  }

  public async findById(id: string): Promise<ProductWithCategories | null> {
    return this.prisma.product.findUnique({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        categories: true,
      }
    });
  }

  public async findAll(
    categoryId?: string,
    name?: string,
  ): Promise<ProductWithCategories[]> {
    return this.prisma.product.findMany({
      where: {
        deletedAt: null,
        ...(categoryId ? { categories: { some: { id: categoryId } } } : {}),
        ...(name ? { name: { contains: name, mode: 'insensitive' } } : {}),
      },
      include: {
        categories: true,
      },
    });
  }
  public async update(
    id: string,
    data: Partial<CreateProductDTO>,
  ): Promise<Product> {
    return this.prisma.product.update({
      where: {
        id,
      },
      data,
    });
  }

  public async updateCategories(
    productId: string,
    categoryIds: string[],
  ): Promise<void> {
    await this.prisma.product.update({
      where: { id: productId },
      data: {
        categories: {
          set: categoryIds.map((categoryId) => ({ id: categoryId })),
        },
      },
    });
  }

  public async softDelete(id: string): Promise<void> {
    await this.prisma.product.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
