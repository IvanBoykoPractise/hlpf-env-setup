import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private readonly repo: Repository<Product>) {}

  findAll() { return this.repo.find({ relations: ['category'] }); }

  async findOne(id: number) {
    const product = await this.repo.findOne({ where: { id }, relations: ['category'] });
    if (!product) throw new NotFoundException(`Product #${id} not found`);
    return product;
  }

  create(data: any) {
    const product = this.repo.create({
      ...data,
      category: data.categoryId ? { id: data.categoryId } : null,
    });
    return this.repo.save(product);
  }

  async update(id: number, data: any) {
    const product = await this.findOne(id);
    if (data.categoryId) product.category = { id: data.categoryId } as any;
    return this.repo.save({ ...product, ...data });
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    return this.repo.remove(product);
  }
}