import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
  public async getActualStock(@Param('categoryId') categoryId: string) {
    return this.getActualStockService.execute({ categoryId });;
  }

  @Post('/movements')
  public async create(
    @Body() body: CreateStockMovementHistoryRequest,
  ): Promise<CreateStockMovementHistoryResponse> {
    return this.createStockMovmentHistoryService.execute(body);
  }

  @Get('/movements')
  public async findAll() {
    return this.getStockMovmentHistoryService.execute();
  }
}
