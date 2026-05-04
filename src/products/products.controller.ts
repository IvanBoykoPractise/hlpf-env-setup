import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@ApiTags('Products') // Групує ендпоінти в секцію "Products" у Swagger UI
@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({
    summary: 'Отримати всі продукти',
    description: 'Повертає список усіх продуктів. Публічний ендпоінт.',
  })
  @ApiResponse({ status: 200, description: 'Список продуктів успішно отримано.' })
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Отримати продукт за ID' })
  @ApiResponse({ status: 200, description: 'Продукт знайдено.' })
  @ApiResponse({ status: 404, description: 'Продукт не знайдено.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Post()
  @ApiBearerAuth() // Додає іконку замка (потребує JWT токен)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Створити новий продукт (Admin)' })
  @ApiResponse({ status: 201, description: 'Продукт успішно створено.' })
  @ApiResponse({ status: 400, description: 'Помилка валідації.' })
  @ApiResponse({ status: 401, description: 'Не авторизовано.' })
  @ApiResponse({ status: 403, description: 'Недостатньо прав (потрібен Admin).' })
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Оновити існуючий продукт (Admin)' })
  @ApiResponse({ status: 200, description: 'Продукт успішно оновлено.' })
  @ApiResponse({ status: 404, description: 'Продукт для оновлення не знайдено.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProductDto,
  ) {
    return this.productsService.update(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Видалити продукт (Admin)' })
  @ApiResponse({ status: 200, description: 'Продукт успішно видалено.' })
  @ApiResponse({ status: 404, description: 'Продукт не знайдено.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}