import { Injectable } from '@nestjs/common';
import { CategoryDTO } from '../dtos/CategoryDTO';
import { CategoryRepository } from '../infra/repositories/CategoryRepository';

type ICreateCategoryCommand = {
  name: string;
};

@Injectable()
export class CreateCategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  public async execute(command: ICreateCategoryCommand): Promise<CategoryDTO> {
    const categoryExists = await this.categoryRepository.findByName(command.name);

    if(categoryExists) {
      throw new Error('Category already exists');
    }

    const category = await this.categoryRepository.create(command.name);
    return category;
  }
}
