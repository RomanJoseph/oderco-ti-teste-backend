import { Injectable } from '@nestjs/common';
import { Category, Prisma, Product, StockMovmentHistory } from '@prisma/client';
import { PrismaProvider } from 'src/infra/prisma/provider/PrismaProvider';
import { CreateStockMovementHistoryDTO } from 'src/stocks/dto/CreateStockMovementHistoryDTO';

export type StockMovementHistoryWithProductAndCategories = StockMovmentHistory & {
  product: Product & { categories: Category[] };
}

@Injectable()
export class StockMovmentHistoryRepository {
  constructor(private readonly prisma: PrismaProvider) {}

  public async create(
    data: CreateStockMovementHistoryDTO,
    prismaTransaction?: Prisma.TransactionClient
  ): Promise<StockMovmentHistory> {
    const prismaClient = prismaTransaction || this.prisma;

    return prismaClient.stockMovmentHistory.create({ data });
  }

  public async findAll(): Promise<StockMovementHistoryWithProductAndCategories[]> {
    return this.prisma.stockMovmentHistory.findMany({
      include: { product: { include: { categories: true } } },
    });
  }

  public async findByCategoryId(
    categoryId: string,
  ): Promise<StockMovementHistoryWithProductAndCategories[]> {
    return this.prisma.stockMovmentHistory.findMany({
      where: { product: { categories: { some: { id: categoryId } } } },
      include: { product: { include: { categories: true } } },
    });
  }

  public async getActualStockQuantityByProductId(productId: string): Promise<number> {
    const stockChangeHistory = await this.prisma.stockMovmentHistory.findMany({
      where: { productId },
    });

    return stockChangeHistory.reduce((acc: number, stock: StockMovementHistoryWithProductAndCategories) => {
      return acc + (stock.type === 'ENTRY' ? stock.quantity : -stock.quantity);
    }, 0);
  }
}
