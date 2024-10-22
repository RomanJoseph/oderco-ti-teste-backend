import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client'; // Importando para o tipo de transação
import { ProductRepository } from '../infra/repositories/ProductRepository';
import { StockMovmentHistoryRepository } from 'src/stocks/infra/repositories/StockMovmentHistoryRepository';
import { PrismaProvider } from 'src/infra/prisma/provider/PrismaProvider';

export type CreateProductCommand = {
  name: string;
  price: number;
  quantity: number;
  categories: string[];
};

@Injectable()
export class CreateProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly stockMovmentHistoryRepository: StockMovmentHistoryRepository,
    private readonly prisma: PrismaProvider,
  ) {}

  public async execute(command: CreateProductCommand) {
    return this.prisma.$transaction(async (tx) => {
      const product = await this.productRepository.create(
        {
          name: command.name,
          price: command.price,
          categoryIds: command.categories,
        },
        tx,
      );

      await this.stockMovmentHistoryRepository.create(
        {
          productId: product.id,
          quantity: command.quantity,
          type: 'ENTRY',
          description: 'New product registered',
          date: new Date(),
        },
        tx,
      );

      return {
        id: product.id,
        name: product.name,
        price: product.price,
        categories: command.categories,
      };
    });
  }
}
