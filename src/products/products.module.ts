import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { AuthModule } from '../auth/auth.module'; // Імпортуємо AuthModule для роботи Guard-ів

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    AuthModule, // Додаємо сюди
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}