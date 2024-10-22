import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../infra/repositories/ProductRepository';
import { StockMovmentHistoryRepository } from 'src/stocks/infra/repositories/StockMovmentHistoryRepository';

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
    private readonly stockMovmentHistoryRepository: StockMovmentHistoryRepository
  ) {}

  public async execute(command: CreateProductCommand) {
    const products = await this.productRepository.create({
      name: command.name,
      price: command.price,
      categoryIds: command.categories,
    });

    await this.stockMovmentHistoryRepository.create({
      productId: products.id,
      quantity: command.quantity,
      type: 'ENTRY',
      description: 'New product registered',
      date: new Date(),
    })

    return {
      id: products.id,
      name: products.name,
      price: products.price,
      categories: command.categories,
    };
  }
}
