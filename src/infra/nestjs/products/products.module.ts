import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ProductRepository } from 'src/products/infra/repositories/ProductRepository';
import { CreateProductService } from 'src/products/services/CreateProductService';
import { ListProductsService } from 'src/products/services/ListProductsService';
import { ProductsController } from 'src/products/controllers/ProductsController';
import { UpdateProductService } from 'src/products/services/UpdateProductService';
import { StockMovmentHistoryRepository } from 'src/stocks/infra/repositories/StockMovmentHistoryRepository';
import { DeleteProductService } from 'src/products/services/DeleteProductService';

@Module({
  imports: [PrismaModule],
  controllers: [ProductsController],
  providers: [
    ProductRepository,
    CreateProductService,
    ListProductsService,
    DeleteProductService,
    StockMovmentHistoryRepository,
    UpdateProductService
  ],
})
export class ProductsModule {}
