import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto'; // Додали імпорт
import { UpdateCategoryDto } from './dto/update-category.dto'; // Додали імпорт

@Controller('categories') // ПРИБРАЛИ 'api/', бо він уже є в main.ts (setGlobalPrefix)
export class CategoriesController {
  constructor(private readonly service: CategoriesService) {}

  @Get() 
  findAll() { 
    return this.service.findAll(); 
  }

  @Get(':id') 
  findOne(@Param('id', ParseIntPipe) id: number) { 
    return this.service.findOne(id); 
  }

  @Post() 
  // ЗАМІНИЛИ any на CreateCategoryDto - це активує валідацію!
  create(@Body() body: CreateCategoryDto) { 
    return this.service.create(body); 
  }

  @Patch(':id') 
  // ЗАМІНИЛИ any на UpdateCategoryDto
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateCategoryDto) { 
    return this.service.update(id, body); 
  }

  @Delete(':id') 
  remove(@Param('id', ParseIntPipe) id: number) { 
    return this.service.remove(id); 
  }
}