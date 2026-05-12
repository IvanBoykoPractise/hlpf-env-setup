import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Глобальний пайп для валідації та ТРАНСФОРМАЦІЇ (важливо для пагінації)
  app.useGlobalPipes(new ValidationPipe({ 
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  // Налаштування Swagger
  const config = new DocumentBuilder()
    .setTitle('HLPF API')
    .setDescription('The products API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  // Оце виведе тобі лінк у термінал
  console.log(`\n✅ Додаток працює!`);
  console.log(`🔗 Локальне посилання: http://localhost:${port}`);
  console.log(`📖 Документація Swagger: http://localhost:${port}/api-docs\n`);
}
bootstrap();