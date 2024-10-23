import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../infra/repositories/CategoryRepository';
import { Category } from '@prisma/client';

type ListCategoriesServiceCommand = {
  name?: string;
};

@Injectable()
export class ListCategoriesService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  public async execute(
    command: ListCategoriesServiceCommand,
  ): Promise<Category[]> {
    return this.categoryRepository.findAll(command.name);
  }
}
