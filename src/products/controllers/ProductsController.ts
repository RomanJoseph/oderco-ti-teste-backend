import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CreateProductService } from '../services/CreateProductService';
import { CreateProductRequest } from './request/CreateProductRequest';
import { CreateProductResponse } from './response/CreateProductResponse';
import { ListProductsService } from '../services/ListProductsService';
import { UpdateProductService } from '../services/UpdateProductService';
import { DeleteProductService } from '../services/DeleteProductService';
import { ListProductsResponse } from './response/ListProductsResponse';
import { UpdateProductRequest } from './request/UpdateProductRequest';

@ApiTags('products')
@Controller('/products')
export class ProductsController {
  constructor(
    private readonly createProductService: CreateProductService,
    private readonly listProductsService: ListProductsService,
    private readonly updateProductService: UpdateProductService,
    private readonly deleteProductService: DeleteProductService,
  ) {}

  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({
    status: 201,
    description: 'Product created successfully.',
    type: CreateProductResponse,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({
    type: CreateProductRequest,
    description: 'Product data',
  })
  @Post()
  async create(
    @Body() body: CreateProductRequest,
  ): Promise<CreateProductResponse> {
    try {
      return this.createProductService.execute(body);
    } catch (error) {
      throw new HttpException(
        'Error creating product: ' + (error.message || 'Unknown error'),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOperation({ summary: 'Get a list of products' })
  @ApiResponse({
    status: 200,
    description: 'List of products fetched successfully.',
    type: Array<ListProductsResponse>,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
  })
  @ApiQuery({
    name: 'name',
    required: false,
    description: 'Filter by product name',
  })
  @ApiQuery({
    name: 'categoryId',
    required: false,
    description: 'Filter by category ID',
  })
  @Get()
  async list(
    @Query('name') name?: string,
    @Query('categoryId') categoryId?: string,
  ): Promise<ListProductsResponse[]> {
    try {
      return this.listProductsService.execute({
        name,
        categoryId,
      });
    } catch (error) {
      throw new HttpException(
        'Error fetching products: ' + (error.message || 'Unknown error'),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiOperation({ summary: 'Update an existing product' })
  @ApiResponse({ status: 200, description: 'Product updated successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiBody({
    type: UpdateProductRequest,
    description: 'Partial product data for update',
  })
  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateProductRequest,
  ): Promise<any> {
    try {
      return this.updateProductService.execute({
        id,
        data: {
          name: body.name,
          price: body.price,
        },
        categories: body.categories,
      });
    } catch (error) {
      throw new HttpException(
        'Error updating product: ' + (error.message || 'Unknown error'),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({ status: 204, description: 'Product deleted successfully.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<void> {
    try {
      return this.deleteProductService.execute(id);
    } catch (error) {
      throw new HttpException(
        'Error deleting product: ' + (error.message || 'Unknown error'),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
