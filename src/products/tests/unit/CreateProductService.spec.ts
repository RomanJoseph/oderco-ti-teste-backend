import { Test, TestingModule } from '@nestjs/testing';
import { StockMovmentHistoryRepository } from 'src/stocks/infra/repositories/StockMovmentHistoryRepository';
import { PrismaProvider } from 'src/infra/prisma/provider/PrismaProvider';
import { ProductRepository } from 'src/products/infra/repositories/ProductRepository';
import { CreateProductService, CreateProductCommand } from 'src/products/services/CreateProductService';

describe('CreateProductService', () => {
    let service: CreateProductService;
    let productRepository: ProductRepository;
    let stockMovmentHistoryRepository: StockMovmentHistoryRepository;
    let prismaProvider: PrismaProvider;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateProductService,
                {
                    provide: ProductRepository,
                    useValue: {
                        create: jest.fn(),
                    },
                },
                {
                    provide: StockMovmentHistoryRepository,
                    useValue: {
                        create: jest.fn(),
                    },
                },
                {
                    provide: PrismaProvider,
                    useValue: {
                        $transaction: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<CreateProductService>(CreateProductService);
        productRepository = module.get<ProductRepository>(ProductRepository);
        stockMovmentHistoryRepository = module.get<StockMovmentHistoryRepository>(StockMovmentHistoryRepository);
        prismaProvider = module.get<PrismaProvider>(PrismaProvider);
    });

    it('should create a product and stock movement history', async () => {
        const command: CreateProductCommand = {
            name: 'Test Product',
            price: 100,
            quantity: 10,
            categories: ['category1', 'category2'],
        };

        const createdProduct = {
            id: 'product-id',
            name: command.name,
            price: command.price,
            categoryIds: command.categories,
        };

        const createdStockMovement = {
            productId: createdProduct.id,
            quantity: command.quantity,
            type: 'ENTRY',
            description: 'New product registered',
            date: new Date(),
        };

        (productRepository.create as jest.Mock).mockResolvedValue(createdProduct);
        (stockMovmentHistoryRepository.create as jest.Mock).mockResolvedValue(createdStockMovement);
        (prismaProvider.$transaction as jest.Mock).mockImplementation(async (fn) => fn({}));

        const result = await service.execute(command);

        expect(result).toEqual({
            id: createdProduct.id,
            name: createdProduct.name,
            price: createdProduct.price,
            categories: command.categories,
        });

        expect(productRepository.create).toHaveBeenCalledWith(
            {
                name: command.name,
                price: command.price,
                categoryIds: command.categories,
            },
            expect.anything(),
        );

        expect(stockMovmentHistoryRepository.create).toHaveBeenCalledWith(
            {
                productId: createdProduct.id,
                quantity: command.quantity,
                type: 'ENTRY',
                description: 'New product registered',
                date: expect.any(Date),
            },
            expect.anything(),
        );
    });
});