import { TestingModule, Test } from '@nestjs/testing';
import { Category } from '@prisma/client';
import { CategoryRepository } from 'src/categories/infra/repositories/CategoryRepository';
import { CreateCategoryService } from 'src/categories/services/CreateCategoryService';
import { CategoryFixture } from 'src/infra/helpers/fixtures/CategoryFixture';
import { PrismaModule } from 'src/infra/nestjs/prisma/prisma.module';

describe('CreateCategoryService', () => {
  let service: CreateCategoryService;
  let repository: CategoryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [CreateCategoryService, CategoryRepository],
    }).compile();

    service = module.get<CreateCategoryService>(CreateCategoryService);
    repository = module.get<CategoryRepository>(CategoryRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new category', async () => {
    const category: Category = CategoryFixture();
    const command = { name: category.name };

    const result = await service.execute(command);

    expect(result.name).toBe(command.name);
  });

  it('should throw an error if category already exists', async () => {
    const category: Category = CategoryFixture();
    const command = { name: category.name };

    await repository.create(command.name);

    await expect(service.execute(command)).rejects.toThrow(
      'Category already exists',
    );
  });
});
