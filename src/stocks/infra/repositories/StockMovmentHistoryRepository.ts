import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaProvider } from 'src/infra/prisma/provider/PrismaProvider';
import { CreateStockMovementHistoryDTO } from 'src/stocks/dto/CreateStockMovementHistoryDTO';
import { StockMovementHistoryDTO } from 'src/stocks/dto/StockMovementHistoryDTO';

@Injectable()
export class StockMovmentHistoryRepository {
  constructor(private readonly prisma: PrismaProvider) {}

  public async create(
    data: CreateStockMovementHistoryDTO,
    prismaTransaction?: Prisma.TransactionClient
  ): Promise<StockMovementHistoryDTO> {
    const prismaClient = prismaTransaction || this.prisma;

    return prismaClient.stockMovmentHistory.create({ data });
  }

  public async findAll(): Promise<StockMovementHistoryDTO[]> {
    return this.prisma.stockMovmentHistory.findMany({
      include: { product: { include: { categories: true } } },
    });
  }

  public async findByCategoryId(
    categoryId: string,
  ): Promise<StockMovementHistoryDTO[]> {
    return this.prisma.stockMovmentHistory.findMany({
      where: { product: { categories: { some: { id: categoryId } } } },
      include: { product: { include: { categories: true } } },
    });
  }

  public async getActualStockQuantityByProductId(productId: string): Promise<number> {
    const stockChangeHistory = await this.prisma.stockMovmentHistory.findMany({
      where: { productId },
    });

    return stockChangeHistory.reduce((acc, stock) => {
      return acc + (stock.type === 'ENTRY' ? stock.quantity : -stock.quantity);
    }, 0);
  }
}
