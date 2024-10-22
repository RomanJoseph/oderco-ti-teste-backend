import { ApiProperty } from '@nestjs/swagger';

export class CreateProductRequest {
  @ApiProperty({ description: 'Product name' })
  name: string;

  @ApiProperty({ description: 'Product price' })
  price: number;

  @ApiProperty({ description: 'Array of category IDs', type: [String] })
  categories: string[];

  @ApiProperty({ description: 'Product quantity' })
  quantity: number;
}
