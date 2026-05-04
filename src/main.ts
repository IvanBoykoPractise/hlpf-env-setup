import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Валідація (вже має бути з минулих занять)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Реєстрація нових компонентів
  app.useGlobalInterceptors(new LoggingInterceptor(), new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  // Налаштування Swagger
  const config = new DocumentBuilder()
    .setTitle('MiniShop API')
    .setDescription('REST API для навчального інтернет-магазину. Автентифікація через JWT Bearer token.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.APP_PORT || 3000);
}
bootstrap();