import { ApiProperty } from '@nestjs/swagger';

export class CreateStockMovementHistoryResponse {
  @ApiProperty({ description: 'Product ID' })
  productId: string;

  @ApiProperty({
    description: 'Type of stock movement, either ENTRY or EXIT',
    enum: ['ENTRY', 'EXIT'],
  })
  type: 'ENTRY' | 'EXIT';

  @ApiProperty({ description: 'Quantity of products moved' })
  quantity: number;

  @ApiProperty({ description: 'Description of the stock movement' })
  description: string;

  @ApiProperty({ description: 'Date of the stock movement', type: Date })
  date: Date;
}
