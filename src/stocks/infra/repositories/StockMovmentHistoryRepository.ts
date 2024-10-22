import { Injectable } from '@nestjs/common';
import { PrismaProvider } from 'src/infra/prisma/provider/PrismaProvider';
import { CreateStockMovementHistoryDTO } from 'src/stocks/dto/CreateStockMovementHistoryDTO';
import { StockMovementHistoryDTO } from 'src/stocks/dto/StockMovementHistoryDTO';

@Injectable()
export class StockMovmentHistoryRepository {
  constructor(private readonly prisma: PrismaProvider) {}

  public async create(
    data: CreateStockMovementHistoryDTO,
  ): Promise<StockMovementHistoryDTO> {
    return this.prisma.stockMovmentHistory.create({ data });
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
}
