import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsInt,
  Min,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'iPhone 16',
    description: 'Назва продукту',
    minLength: 2,
    maxLength: 255,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  name!: string;

  @ApiProperty({
    example: 999.99,
    description: 'Ціна у гривнях (макс. 2 знаки після коми)',
    minimum: 0.01,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  price!: number;

  @ApiPropertyOptional({
    example: 'Новий флагман від Apple',
    description: 'Детальний опис товару',
    maxLength: 1000,
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @ApiPropertyOptional({
    example: 50,
    description: 'Кількість одиниць на складі',
    minimum: 0,
    default: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  stock?: number;

  @ApiPropertyOptional({
    example: 1,
    description: 'ID категорії, до якої належить продукт',
  })
  @IsOptional()
  @IsInt()
  categoryId?: number;
}