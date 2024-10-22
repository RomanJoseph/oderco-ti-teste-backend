import { Injectable } from '@nestjs/common';
import { StockMovmentHistoryRepository } from '../infra/repositories/StockMovmentHistoryRepository';

type CreateStockMovmentHistoryCommand = {
  productId: string;
  type: 'ENTRY' | 'EXIT';
  quantity: number;
  description: string;
};

@Injectable()
export class CreateStockMovmentHistoryService {
  constructor(
    private readonly stockMovmentHistoryRepository: StockMovmentHistoryRepository,
  ) {}

  public async execute(command: CreateStockMovmentHistoryCommand) {
    return this.stockMovmentHistoryRepository.create({
      productId: command.productId,
      type: command.type,
      quantity: command.quantity,
      description: command.description,
      date: new Date(),
    });
  }
}
