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
    const category = await this.categoryRepository.create(command.name);
    return category;
  }
}
