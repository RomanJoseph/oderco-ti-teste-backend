import { Injectable } from "@nestjs/common";
import { ProductRepository } from "../infra/repositories/ProductRepository";

export type CreateProductCommand = {
    name: string;
    price: number;
}

@Injectable()
export class CreateProductService {
    constructor(private productRepository: ProductRepository) {}

    public async execute(command: CreateProductCommand) {
        return this.productRepository.create(command.name, command.price);
    }
}