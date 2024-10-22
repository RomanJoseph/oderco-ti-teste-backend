import { Injectable } from '@nestjs/common';
import { CategoryDTO } from '../dtos/CategoryDTO';
import { CategoryRepository } from '../infra/repositories/CategoryRepository';

type ListCategoriesServiceCommand = {
  name?: string;
};

@Injectable()
export class ListCategoriesService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  public async execute(
    command: ListCategoriesServiceCommand,
  ): Promise<CategoryDTO[]> {
    return this.categoryRepository.findAll(command.name);
  }
}
