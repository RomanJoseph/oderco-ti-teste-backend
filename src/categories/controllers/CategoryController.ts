import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBody } from '@nestjs/swagger';
import { CreateCategoryService } from '../services/CreateCategoryService';
import { ListCategoriesService } from '../services/ListCategoriesService';
import { CreateCategoryRequest } from './request/CreateCategoryRequest';
import { CreateCategoryResponse } from './response/CreateCategoryResponse';
import { ListCategoriesResponse } from './response/ListCategoriesResponse';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly createCategoryService: CreateCategoryService,
    private readonly listCategoriesService: ListCategoriesService,
  ) {}

  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({ status: 201, description: 'Category created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  // @ApiBody({ type: CreateCategoryRequest })
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

  @ApiOperation({ summary: 'Get a list of categories' })
  @ApiResponse({ status: 200, description: 'List of categories fetched successfully.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @ApiQuery({ name: 'name', required: false, description: 'Filter by category name' })
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
