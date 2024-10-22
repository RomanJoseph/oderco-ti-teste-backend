import { TestingModule, Test } from "@nestjs/testing";
import { Category } from "@prisma/client";
import { CategoryRepository } from "src/categories/infra/repositories/CategoryRepository";
import { ListCategoriesService } from "src/categories/services/ListCategoriesService";
import { CategoryFixture } from "src/infra/helpers/fixtures/CategoryFixture";
import { PrismaModule } from "src/infra/nestjs/prisma/prisma.module";

describe('ListCategoriesService', () => {
    let service: ListCategoriesService;
    let repository: CategoryRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [PrismaModule],
            providers: [
                ListCategoriesService,
                {
                    provide: CategoryRepository,
                    useValue: {
                        findAll: jest.fn()
                    },
                },
            ],
        }).compile();

        service = module.get<ListCategoriesService>(ListCategoriesService);
        repository = module.get<CategoryRepository>(CategoryRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('Should List Categories', async () => {
        const category: Category = CategoryFixture();
        jest.spyOn(repository, 'findAll').mockResolvedValueOnce([category]);

        const result = await service.execute({});

        expect(result).toHaveLength(1);
        expect(result[0].name).toBe(category.name);
    });

    it('Should filter by Name', async () => {
        const category: Category = CategoryFixture();
        const category2: Category = CategoryFixture();
        category2.name = 'Other Name';

        jest.spyOn(repository, 'findAll').mockResolvedValueOnce([category]);

        const result = await service.execute({ name: category.name });

        expect(result).toHaveLength(1);
        expect(result[0].name).toBe(category.name);
    });

    it('Should return empty array if no categories match the filter', async () => {
        jest.spyOn(repository, 'findAll').mockResolvedValueOnce([]);

        const result = await service.execute({ name: 'Non-existent Name' });

        expect(result).toHaveLength(0);
    });

    it('Should return all categories if no filter is provided', async () => {
        const category1: Category = CategoryFixture();
        const category2: Category = CategoryFixture();
        category2.name = 'Another Category';

        jest.spyOn(repository, 'findAll').mockResolvedValueOnce([category1, category2]);

        const result = await service.execute({});

        expect(result).toHaveLength(2);
        expect(result.map((c) => c.name)).toEqual(
            expect.arrayContaining([category1.name, category2.name]),
        );
    });
});
