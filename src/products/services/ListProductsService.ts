import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../infra/repositories/ProductRepository';
import { ProductCategoryRepository } from '../infra/repositories/ProductCategoryRepository';

@Injectable()
export class ListProductsService {
  constructor(
    private readonly productRepository: ProductRepository,
  ) {}

  public async execute() {
    const products = await this.productRepository.findAll();
    return products.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      categories: product.categories.map((category) => category.id),
    }));
  }
}
