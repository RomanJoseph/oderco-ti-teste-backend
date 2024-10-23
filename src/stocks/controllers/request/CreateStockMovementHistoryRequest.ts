import { IsString, IsNotEmpty, IsEnum, IsNumber, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStockMovementHistoryRequest {
  @ApiProperty({ description: 'Product ID' })
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({
    description: 'Type of stock movement, either ENTRY or EXIT',
    enum: ['ENTRY', 'EXIT'],
  })
  @IsEnum(['ENTRY', 'EXIT'])
  type: 'ENTRY' | 'EXIT';

  @ApiProperty({ description: 'Quantity of products moved' })
  @IsNumber()
  quantity: number;

  @ApiProperty({ description: 'Description of the stock movement' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Date of the stock movement' })
  @IsString()
  date: string;
}
