import { Injectable } from "@nestjs/common";
import { ProductRepository } from "../infra/repositories/ProductRepository";
import { ProductCategoryRepository } from "../infra/repositories/ProductCategoryRepository";
import { CreateProductDTO } from "../dtos/CreateProductDTO";

type UpdateProductServiceCommand = {
    id: string;
    data: Partial<CreateProductDTO>;
    categories?: string[];
};

@Injectable()
export class UpdateProductService {
    constructor(
        private readonly productRepository: ProductRepository,
        private readonly productCategoryRepository: ProductCategoryRepository
    ) {}

    public async execute(command: UpdateProductServiceCommand) {
        const product = await this.productRepository.findById(command.id);

        if (!product) {
            throw new Error('Product not found');
        }

        const updatedProduct = await this.productRepository.update(command.id, command.data);

        if (command.categories && command.categories.length > 0) {
            await this.productCategoryRepository.deleteByProductId(command.id);

            const productCategories = command.categories.map(category => ({
                ProductId: command.id,
                CategoryId: category
            }));

            await this.productCategoryRepository.create(productCategories);
        }

        return {
            ...updatedProduct,
            categories: command.categories
        };
    }
}
