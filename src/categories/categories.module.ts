import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { AuthModule } from '../auth/auth.module'; // Імпортуємо AuthModule для роботи Guard-ів

@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),
    AuthModule, // Додаємо сюди
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}