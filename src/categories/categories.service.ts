import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private readonly repo: Repository<Category>) {}

  findAll() { return this.repo.find(); }

  async findOne(id: number) {
    const category = await this.repo.findOneBy({ id });
    if (!category) throw new NotFoundException(`Category #${id} not found`);
    return category;
  }

  create(data: Partial<Category>) { return this.repo.save(this.repo.create(data)); }

  async update(id: number, data: Partial<Category>) {
    const category = await this.findOne(id);
    return this.repo.save({ ...category, ...data });
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    return this.repo.remove(category);
  }
}