import { ApiProperty } from '@nestjs/swagger';

export class FindAllStockMovementsResponse {
  @ApiProperty({ description: 'Stock movement history ID' })
  id: string;

  @ApiProperty({ description: 'Product ID associated with the movement' })
  productId: string;

  @ApiProperty({
    description: 'Type of stock movement, either ENTRY or EXIT',
    enum: ['ENTRY', 'EXIT'],
  })
  type: 'ENTRY' | 'EXIT';

  @ApiProperty({ description: 'Description of the stock movement' })
  description: string;

  @ApiProperty({ description: 'Quantity of products moved' })
  quantity: number;

  @ApiProperty({ description: 'Date when the stock movement occurred', type: Date })
  date: Date;

  @ApiProperty({ description: 'Date when the record was created', type: Date })
  createdAt: Date;
}
