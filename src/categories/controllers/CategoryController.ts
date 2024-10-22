import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateCategoryService } from '../services/CreateCategoryService';
import { ListCategoriesService } from '../services/ListCategoriesService';
import { CreateCategoryRequest } from './request/CreateCategoryRequest';
import { CreateCategoryResponse } from './response/CreateCategoryResponse';
import { ListCategoriesResponse } from './response/ListCategoriesResponse';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly createCategoryService: CreateCategoryService,
    private readonly listCategoriesService: ListCategoriesService,
  ) {}

  @Post()
  public async createCategory(
    @Body() body: CreateCategoryRequest,
  ): Promise<CreateCategoryResponse> {
    try {
      return await this.createCategoryService.execute(body);
    } catch (error) {
      throw new HttpException(
        'Error creating category: ' + (error.message || 'Unknown error'),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  public async listCategories(
    @Query('name') name?: string,
  ): Promise<ListCategoriesResponse> {
    try {
      return await this.listCategoriesService.execute({ name });
    } catch (error) {
      throw new HttpException(
        'Error fetching categories: ' + (error.message || 'Unknown error'),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
