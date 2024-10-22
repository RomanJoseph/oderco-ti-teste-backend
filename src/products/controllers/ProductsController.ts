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
import { CreateProductService } from '../services/CreateProductService';
import { CreateProductRequest } from './request/CreateProductRequest';
import { CreateProductResponse } from './response/CreateProductResponse';
import { ListProductsService } from '../services/ListProductsService';
import { UpdateProductService } from '../services/UpdateProductService';
import { ListProductsResponse } from './response/ListProductsResponse';
import { DeleteProductService } from '../services/DeleteProductService';

@Controller('/products')
export class ProductsController {
  constructor(
    private readonly createProductService: CreateProductService,
    private readonly listProductsService: ListProductsService,
    private readonly updateProductService: UpdateProductService,
    private readonly deleteProductService: DeleteProductService,
  ) {}

  @Post()
  async create(
    @Body() body: CreateProductRequest,
  ): Promise<CreateProductResponse> {
    try {
      return await this.createProductService.execute(body);
    } catch (error) {
      throw new HttpException(
        'Error creating product: ' + (error.message || 'Unknown error'),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async list(
    @Query('name') name?: string,
    @Query('categoryId') categoryId?: string,
  ): Promise<any> {
    try {
      return await this.listProductsService.execute({
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

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() body: Partial<CreateProductRequest>,
  ): Promise<any> {
    try {
      return await this.updateProductService.execute({
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

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<void> {
    try {
      return await this.deleteProductService.execute(id);
    } catch (error) {
      throw new HttpException(
        'Error deleting product: ' + (error.message || 'Unknown error'),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
