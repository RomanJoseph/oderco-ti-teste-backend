import { Injectable } from "@nestjs/common";
import { CategoryDTO } from "../dtos/CategoryDTO";
import { CategoryRepository } from "../infra/repositories/CategoryRepository";

@Injectable()
export class ListCategoriesService {
    constructor(
        private readonly categoryRepository: CategoryRepository
    ) {}

    public async execute(): Promise<CategoryDTO[]> {
        return this.categoryRepository.findAll();
    }
}