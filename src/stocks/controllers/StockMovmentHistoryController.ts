import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { CreateStockMovmentHistoryService } from '../services/CreateStockMovmentHistoryService';
import { CreateStockMovementHistoryRequest } from './request/CreateStockMovementHistoryRequest';
import { CreateStockMovementHistoryResponse } from './response/CreateStockMovementHistoryResponse';
import { GetStockMovementHistoryService } from '../services/GetStockMovementsHistoryService';
import { GetActualStockService } from '../services/GetActualStockService';
import { FindAllStockMovementsResponse } from './response/FindAllStockMovementsResponse';
import { GetActualStockServiceResponse } from './response/GetActualStockResponse';

@ApiTags('stocks')
@Controller('/stocks')
export class StockMovmentHistoryController {
  constructor(
    private readonly createStockMovmentHistoryService: CreateStockMovmentHistoryService,
    private readonly getStockMovmentHistoryService: GetStockMovementHistoryService,
    private readonly getActualStockService: GetActualStockService,
  ) {}

  @ApiOperation({ summary: 'Get actual stock' })
  @ApiResponse({ status: 200, description: 'Stock fetched successfully.', type: GetActualStockServiceResponse })
  @ApiQuery({
    name: 'categoryId',
    required: false,
    description: 'Category ID to filter stocks',
  })
  @Get('/')
  public async getActualStock(
    @Query('categoryId') categoryId?: string,
  ): Promise<GetActualStockServiceResponse> {
    try {
      return this.getActualStockService.execute({ categoryId });
    } catch (error) {
      throw new HttpException(
        'Error fetching actual stock: ' + (error.message || 'Unknown error'),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiOperation({ summary: 'Create a stock movement' })
  @ApiResponse({
    status: 201,
    description: 'Stock movement created successfully.',
    type: CreateStockMovementHistoryResponse,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({
    description: 'Stock Movement History Data',
    type: CreateStockMovementHistoryRequest,
  })
  @Post('/movements')
  public async create(
    @Body() body: CreateStockMovementHistoryRequest,
  ): Promise<CreateStockMovementHistoryResponse> {
    try {
      return this.createStockMovmentHistoryService.execute(body);
    } catch (error) {
      throw new HttpException(
        'Error creating stock movement: ' + (error.message || 'Unknown error'),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOperation({ summary: 'Get all stock movements' })
  @ApiResponse({
    status: 200,
    description: 'List of stock movements fetched successfully.',
    type: Array<FindAllStockMovementsResponse>,
  })
  @Get('/movements')
  public async findAll(): Promise<FindAllStockMovementsResponse[]> {
    try {
      return this.getStockMovmentHistoryService.execute();
    } catch (error) {
      throw new HttpException(
        'Error fetching stock movements: ' + (error.message || 'Unknown error'),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
