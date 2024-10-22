
import { TestingModule, Test } from '@nestjs/testing';
import { Category } from '@prisma/client';
import { CategoryRepository } from 'src/categories/infra/repositories/CategoryRepository';
import { CreateCategoryService } from 'src/categories/services/CreateCategoryService';
import { CategoryFixture } from 'src/infra/helpers/fixtures/CategoryFixture';

describe('CreateCategoryService', () => {
    let service: CreateCategoryService;
    let repository: CategoryRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateCategoryService,
                {
                    provide: CategoryRepository,
                    useValue: {
                        findByName: jest.fn(),
                        create: jest.fn(),
                    },
                },
            ],
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

        jest.spyOn(repository, 'findByName').mockResolvedValue(null);
        jest.spyOn(repository, 'create').mockResolvedValue(category);

        const result = await service.execute(command);

        expect(repository.findByName).toHaveBeenCalledWith(command.name);
        expect(repository.create).toHaveBeenCalledWith(command.name);
        expect(result).toEqual(category);
    });

    it('should throw an error if category already exists', async () => {
        const command = { name: 'Existing Category' };
        const categoryDTO: Category = { id: '1', name: 'New Category', createdAt: new Date() };

        jest.spyOn(repository, 'findByName').mockResolvedValue(categoryDTO);

        await expect(service.execute(command)).rejects.toThrow('Category already exists');
        expect(repository.findByName).toHaveBeenCalledWith(command.name);
        expect(repository.create).not.toHaveBeenCalled();
    });
});