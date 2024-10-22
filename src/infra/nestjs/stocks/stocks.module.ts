import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { StockMovmentHistoryController } from 'src/stocks/controllers/StockMovmentHistoryController';
import { CreateStockMovmentHistoryService } from 'src/stocks/services/CreateStockMovmentHistoryService';
import { GetStockMovementHistoryService } from 'src/stocks/services/GetStockMovementsHistoryService';
import { GetActualStockService } from 'src/stocks/services/GetActualStockService';
import { StockMovmentHistoryRepository } from 'src/stocks/infra/repositories/StockMovmentHistoryRepository';

@Module({
  imports: [PrismaModule],
  controllers: [StockMovmentHistoryController],
  providers: [
    CreateStockMovmentHistoryService,
    GetActualStockService,
    StockMovmentHistoryRepository,
    GetStockMovementHistoryService,
  ],
})
export class StocksModule {}
