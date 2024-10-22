import { ApiProperty } from '@nestjs/swagger';

class ProductStock {
  @ApiProperty({ description: 'Product name' })
  name: string;

  @ApiProperty({ description: 'Current stock of the product' })
  currentStock: number;

  @ApiProperty({
    description: 'Categories the product belongs to',
    type: [String],
  })
  categories: string[];
}

export class GetActualStockServiceResponse {
  @ApiProperty({
    description: 'List of products with their current stock and categories',
    type: [ProductStock],
  })
  products: ProductStock[];

  @ApiProperty({ description: 'Total quantity of all products' })
  totalQuantity: number;
}
