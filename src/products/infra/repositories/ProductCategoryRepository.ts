import { Injectable } from '@nestjs/common';
import { PrismaProvider } from 'src/infra/prisma/provider/PrismaProvider';
import { CreateProductCategoryDTO } from 'src/products/dtos/CreateProductCategoryDTO';

@Injectable()
export class ProductCategoryRepository {
  constructor(private readonly prisma: PrismaProvider) {}

  public async create(dto: CreateProductCategoryDTO[]) {
    return this.prisma.productCategory.createMany({
      data: dto.map((item) => ({
        productId: item.ProductId,
        categoryId: item.CategoryId,
      })),
    });
  }

  public async deleteByProductId(productId: string) {
    return this.prisma.productCategory.deleteMany({
      where: {
        productId,
      },
    });
  }
}
