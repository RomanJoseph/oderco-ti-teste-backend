import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateProductService } from '../services/CreateProductService';
import { CreateProductRequest } from './request/CreateProductRequest';
import { CreateProductResponse } from './response/CreateProductResponse';
import { ListProductsService } from '../services/ListProductsService';
import { UpdateProductService } from '../services/UpdateProductService';
import { ListProductsResponse } from './response/ListProductsResponse';

@Controller('/products')
export class ProductsController {
  constructor(
    private readonly createProductService: CreateProductService,
    private readonly listProductsService: ListProductsService,
    private readonly updateProductService: UpdateProductService,
  ) {}

  @Post()
  async create(
    @Body() body: CreateProductRequest,
  ): Promise<CreateProductResponse> {
    return this.createProductService.execute(body);
  }

  @Get()
  async list(): Promise<any> {
    return this.listProductsService.execute();
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() body: Partial<CreateProductRequest>,
  ): Promise<any> {
    return this.updateProductService.execute(
      {
        id,
        data: {
          name: body.name,
          price: body.price,
        },
        categories: body.categories,
      }
    );
  }
}
