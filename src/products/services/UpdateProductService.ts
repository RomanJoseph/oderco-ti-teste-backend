import { Injectable, NotFoundException } from "@nestjs/common";
import { ProductRepository } from "../infra/repositories/ProductRepository";
import { CreateProductDTO } from "../dtos/CreateProductDTO";

type UpdateProductServiceCommand = {
    id: string;
    data: Partial<CreateProductDTO>;
    categories?: string[];
};

@Injectable()
export class UpdateProductService {
    constructor(
        private readonly productRepository: ProductRepository
    ) {}

    public async execute(command: UpdateProductServiceCommand) {
        const product = await this.productRepository.findById(command.id);

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        const updatedProduct = await this.productRepository.update(command.id, command.data);

        if (command.categories && command.categories.length > 0) {
            await this.productRepository.updateCategories(command.id, command.categories);
        }

        return {
            ...updatedProduct,
            categories: command.categories ?? product.categories
        };
    }
}
