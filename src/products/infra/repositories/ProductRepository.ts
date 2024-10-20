import { Injectable } from "@nestjs/common";
import { PrismaProvider } from "src/infra/prisma/provider/PrismaProvider";
import { ProductDTO } from "src/products/dtos/ProductDTO";

@Injectable()
export class ProductRepository {
    constructor( private readonly prisma: PrismaProvider ) {}

    public async create(name: string, price: number): Promise<ProductDTO> {
        return this.prisma.product.create({
            data: {
                name,
                price
            }
        });
    }

    public async findAll() {
        return this.prisma.product.findMany();
    }
}