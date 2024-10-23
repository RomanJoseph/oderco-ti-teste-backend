import { IsString, IsNotEmpty, IsNumber, IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductRequest {
  @ApiProperty({ description: 'Product name' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Product price' })
  @IsOptional()
  @IsNumber()
  price: number;

  @ApiProperty({ description: 'Array of category IDs', type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  categories: string[];
}
