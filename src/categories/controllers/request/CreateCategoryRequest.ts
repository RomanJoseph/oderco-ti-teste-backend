import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryRequest {
  @ApiProperty({ description: 'Category name' })
  name: string;
}
