import { Injectable } from "@nestjs/common";
import { ProductRepository } from "../infra/repositories/ProductRepository";

@Injectable()
export class ListProductsService {
    constructor(private productRepository: ProductRepository) {}

    public async execute() {
        return this.productRepository.findAll();
    }
}