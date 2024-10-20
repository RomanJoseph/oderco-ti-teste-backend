import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../infra/repositories/ProductRepository';
import { CategoryRepository } from 'src/categories/infra/repositories/CategoryRepository';
import { ProductCategoryRepository } from '../infra/repositories/ProductCategoryRepository';

export type CreateProductCommand = {
  name: string;
  price: number;
  categories: string[];
};

@Injectable()
export class CreateProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productCategoryRepository: ProductCategoryRepository,
  ) {}

  public async execute(command: CreateProductCommand) {
    const products = await this.productRepository.create({
      name: command.name,
      price: command.price,
    });

    await this.productCategoryRepository.create(
      command.categories.map((categoryId) => ({
        ProductId: products.id,
        CategoryId: categoryId,
      })),
    );

    return {
      id: products.id,
      name: products.name,
      price: products.price,
      categories: command.categories,
    };
  }
}
