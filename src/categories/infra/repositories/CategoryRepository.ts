import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { CategoryDTO } from 'src/categories/dtos/CategoryDTO';
import { PrismaProvider } from 'src/infra/prisma/provider/PrismaProvider';

@Injectable()
export class CategoryRepository {
  constructor(private readonly prisma: PrismaProvider) {}

  public async create(name: string): Promise<CategoryDTO> {
    return this.prisma.category.create({
      data: {
        name,
      },
    });
  }

  public async findByName(name: string): Promise<Category | null> {
    return this.prisma.category.findFirst({
      where: {
        name,
      },
    });
  }

  public async findAll(name?: string): Promise<CategoryDTO[]> {
    return this.prisma.category.findMany({
      where: {
        ...(name ? { name: { contains: name, mode: 'insensitive' } } : {})
      },
    });
  }
}
