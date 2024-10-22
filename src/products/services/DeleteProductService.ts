import { Injectable } from "@nestjs/common";
import { ProductRepository } from "../infra/repositories/ProductRepository";

@Injectable()
export class DeleteProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  public async execute(id: string): Promise<void> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new Error('Product not found');
    }

    await this.productRepository.softDelete(id);
  }
}