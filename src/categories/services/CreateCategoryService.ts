import { ConflictException, Injectable } from '@nestjs/common';
import { CategoryRepository } from '../infra/repositories/CategoryRepository';
import { Category } from '@prisma/client';

type ICreateCategoryCommand = {
  name: string;
};

@Injectable()
export class CreateCategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  public async execute(command: ICreateCategoryCommand): Promise<Category> {
    const categoryExists = await this.categoryRepository.findByName(command.name);

    if(categoryExists) {
      throw new ConflictException('Category already exists');
    }

    const category = await this.categoryRepository.create(command.name);
    return category;
  }
}
