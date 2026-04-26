import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { TrimPipe } from './common/trim.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Налаштування глобальних пайпів
  app.useGlobalPipes(
    // 1. Пайп для обрізки пробілів у рядках
    new TrimPipe(), 
    
    // 2. Пайп для валідації вхідних даних (DTO)
    new ValidationPipe({
      whitelist: true,            // Видаляє з запиту поля, яких немає в DTO
      forbidNonWhitelisted: true, // Повертає помилку 400, якщо передано зайві поля
      transform: true,            // Автоматично перетворює типи (наприклад, "5" -> 5)
    }),
  );

  // Налаштування префікса API (якщо ти використовуєш /api/...)
  app.setGlobalPrefix('api');

  // Для Docker важливо слухати на 0.0.0.0
  await app.listen(3000, '0.0.0.0');
  
  const url = await app.getUrl();
  console.log(`Application is running on: ${url}`);
}
bootstrap();