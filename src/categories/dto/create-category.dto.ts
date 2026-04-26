import { IsString, MinLength, MaxLength, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @IsString({ message: 'Назва категорії має бути рядком' })
  @IsNotEmpty({ message: 'Назва не може бути порожньою' }) // Обов'язково для валідації 400
  @MinLength(2, { message: 'Назва занадто коротка (мін. 2 символи)' })
  @MaxLength(100, { message: 'Назва занадто довга (макс. 100 символів)' })
  name!: string;

  @IsOptional()
  @IsString({ message: 'Опис має бути рядком' })
  @MaxLength(500, { message: 'Опис занадто довгий (макс. 500 символів)' })
  description?: string;
}