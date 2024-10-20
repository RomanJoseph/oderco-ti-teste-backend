import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CategoriesController } from 'src/categories/controllers/CategoryController';
import { CreateCategoryService } from 'src/categories/services/CreateCategoryService';
import { CategoryRepository } from 'src/categories/infra/repositories/CategoryRepository';
import { ListCategoriesService } from 'src/categories/services/ListCategoriesService';

@Module({
  imports: [PrismaModule],
  controllers: [CategoriesController],
  providers: [CreateCategoryService, CategoryRepository, ListCategoriesService],
})
export class CategoriesModule {}
