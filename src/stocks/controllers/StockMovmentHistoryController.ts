import { Body, Controller, Get, Param, Post, Query, HttpException, HttpStatus } from '@nestjs/common';
import { CreateStockMovmentHistoryService } from '../services/CreateStockMovmentHistoryService';
import { CreateStockMovementHistoryRequest } from './request/CreateStockMovementHistoryRequest';
import { CreateStockMovementHistoryResponse } from './response/CreateStockMovementHistoryResponse';
import { GetStockMovementHistoryService } from '../services/GetStockMovementsHistoryService';
import { GetActualStockService } from '../services/GetActualStockService';

@Controller('/stocks')
export class StockMovmentHistoryController {
  constructor(
    private readonly createStockMovmentHistoryService: CreateStockMovmentHistoryService,
    private readonly getStockMovmentHistoryService: GetStockMovementHistoryService,
    private readonly getActualStockService: GetActualStockService,
  ) {}

  @Get('/')
  public async getActualStock(@Query('categoryId') categoryId?: string) {
    try {
      return await this.getActualStockService.execute({ categoryId });
    } catch (error) {
      throw new HttpException(
        'Error fetching actual stock: ' + (error.message || 'Unknown error'),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/movements')
  public async create(
    @Body() body: CreateStockMovementHistoryRequest,
  ): Promise<CreateStockMovementHistoryResponse> {
    try {
      return await this.createStockMovmentHistoryService.execute(body);
    } catch (error) {
      throw new HttpException(
        'Error creating stock movement: ' + (error.message || 'Unknown error'),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('/movements')
  public async findAll() {
    try {
      return await this.getStockMovmentHistoryService.execute();
    } catch (error) {
      throw new HttpException(
        'Error fetching stock movements: ' + (error.message || 'Unknown error'),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
