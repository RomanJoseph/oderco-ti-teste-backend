import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductRequest {
  @ApiProperty({ description: 'Product name' })
  name: string;

  @ApiProperty({ description: 'Product price' })
  price: number;

  @ApiProperty({ description: 'Array of category IDs', type: [String] })
  categories: string[];
}
