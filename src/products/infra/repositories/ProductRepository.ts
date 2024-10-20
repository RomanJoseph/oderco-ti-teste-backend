import { Injectable } from "@nestjs/common";
import { PrismaProvider } from "src/infra/prisma/provider/PrismaProvider";
import { CreateProductDTO } from "src/products/dtos/CreateProductDTO";
import { ProductDTO } from "src/products/dtos/ProductDTO";

@Injectable()
export class ProductRepository {
    constructor( private readonly prisma: PrismaProvider ) {}

    public async create(dto: CreateProductDTO): Promise<ProductDTO> {
        return this.prisma.product.create({
            data: {
                name: dto.name,
                price: dto.price
            }
        });
    }

    public async findById(id: string): Promise<ProductDTO | null> {
        return this.prisma.product.findUnique({
            where: {
                id
            }});
    }

    public async findAll() {
        return this.prisma.product.findMany({
            include: {
                categories: true
            }
        });
    }

    public async update(id: string, data: Partial<CreateProductDTO>): Promise<ProductDTO> {
        return this.prisma.product.update({
            where: {
                id
            },
            data
        });
    }
}