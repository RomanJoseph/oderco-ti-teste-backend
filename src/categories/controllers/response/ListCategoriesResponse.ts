import { ApiProperty } from '@nestjs/swagger';

export class ListCategoriesItemResponse {  
  @ApiProperty({ description: 'Category ID' })
  id: string;

  @ApiProperty({ description: 'Category name' })
  name: string;

  @ApiProperty({ description: 'Creation date of the category' })
  createdAt: Date;
}
