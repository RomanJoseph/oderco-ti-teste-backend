import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateCategoryService } from '../services/CreateCategoryService';
import { CreateCategoryRequest } from './request/CreateCategoryRequest';
import { ListCategoriesService } from '../services/ListCategoriesService';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly createCategoryService: CreateCategoryService,
    private readonly listCategoriesService: ListCategoriesService
  ) {}

  @Post()
  public async createCategory(@Body() body: CreateCategoryRequest) {
    return this.createCategoryService.execute(body);
  }

  @Get()
  public async listCategories() {
    return this.listCategoriesService.execute();
  }
}