import { Injectable } from '@nestjs/common';
import { StockMovmentHistoryRepository } from '../infra/repositories/StockMovmentHistoryRepository';
import { StockMovementHistoryWithProductAndCategories } from 'src/infra/prisma/types/StockMovementHistoryWithProductAndCategories';
import { Category } from '@prisma/client';

type GetActualStockServiceCommand = {
  categoryId?: string;
};

type GetActualStockServiceResponse = {
  products: { name: string; currentStock: number; categories: string[] }[];
  totalQuantity: number;
};

@Injectable()
export class GetActualStockService {
  constructor(
    private readonly stockMovementHistoryRepository: StockMovmentHistoryRepository,
  ) {}

  public async execute(
    command: GetActualStockServiceCommand,
  ): Promise<GetActualStockServiceResponse> {
    const stockChangeHistory = command.categoryId
      ? await this.stockMovementHistoryRepository.findByCategoryId(
          command.categoryId,
        )
      : await this.stockMovementHistoryRepository.findAll();

    return this.calculateStock(stockChangeHistory);
  }

  private calculateStock(
    stockChangeHistory: StockMovementHistoryWithProductAndCategories[],
  ): GetActualStockServiceResponse {
    const productStockMap = stockChangeHistory.reduce(
      (acc, stock) => {
        const productName = stock.product.name
        const productCategories =
          stock.product?.categories?.map(
            (category: Category) => category.id,
          ) || [];

        if (!acc[productName]) {
          acc[productName] = { currentStock: 0, categories: productCategories };
        }

        acc[productName].currentStock +=
          stock.type === 'ENTRY' ? stock.quantity : -stock.quantity;
        return acc;
      },
      {} as {
        [productName: string]: { currentStock: number; categories: string[] };
      },
    );

    const products = Object.entries(productStockMap).map(([name, data]) => ({
      name,
      currentStock: data.currentStock,
      categories: data.categories,
    }));

    const totalQuantity = products.reduce(
      (acc, product) => acc + product.currentStock,
      0,
    );

    return { products, totalQuantity };
  }
}
