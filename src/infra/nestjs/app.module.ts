import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { StocksModule } from './stocks/stocks.module';

@Module({
  imports: [ProductsModule, CategoriesModule, StocksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
