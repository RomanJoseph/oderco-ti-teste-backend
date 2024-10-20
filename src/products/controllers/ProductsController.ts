import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateProductService } from '../services/CreateProductService';
import { CreateProductRequest } from './request/CreateProductRequest';
import { CreateProductResponse } from './response/CreateProductResponse';
import { ListProductsService } from '../services/ListProductsService';

@Controller('/products')
export class ProductsController {
  constructor(
    private readonly createProductService: CreateProductService,
    private readonly listProductsService: ListProductsService,
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
}
