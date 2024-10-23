import { Product, Category } from '@prisma/client';

export type ProductWithCategories = Product & { categories: Category[] };
