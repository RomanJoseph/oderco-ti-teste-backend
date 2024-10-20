import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ProductRepository } from 'src/products/infra/repositories/ProductRepository';
import { CreateProductService } from 'src/products/services/CreateProductService';
import { ListProductsService } from 'src/products/services/ListProductsService';
import { ProductsController } from 'src/products/controllers/ProductsController';
import { ProductCategoryRepository } from 'src/products/infra/repositories/ProductCategoryRepository';
import { UpdateProductService } from 'src/products/services/UpdateProductService';

@Module({
  imports: [PrismaModule],
  controllers: [ProductsController],
  providers: [
    ProductRepository,
    CreateProductService,
    ListProductsService,
    ProductCategoryRepository,
    UpdateProductService
  ],
})
export class ProductsModule {}
