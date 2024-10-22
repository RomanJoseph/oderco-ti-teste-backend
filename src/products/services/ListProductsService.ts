import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../infra/repositories/ProductRepository';

type ListProductServiceCommand = {
  name?: string;
  categoryId?: string;
};

type ListProductServiceResponse = {
  id: string;
  name: string;
  price: number;
  categories: string[];
}[];

@Injectable()
export class ListProductsService {
  constructor(private readonly productRepository: ProductRepository) {}

  public async execute(
    command: ListProductServiceCommand,
  ): Promise<ListProductServiceResponse> {
    const products = await this.productRepository.findAll(
      command.categoryId,
      command.name,
    );

    return products.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      categories: product.categories!.map((category) => category.id),
    }));
  }
}
