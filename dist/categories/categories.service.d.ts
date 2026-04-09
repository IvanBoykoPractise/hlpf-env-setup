import { Repository } from 'typeorm';
import { Category } from './category.entity';
export declare class CategoriesService {
    private readonly repo;
    constructor(repo: Repository<Category>);
    findAll(): Promise<Category[]>;
    findOne(id: number): Promise<Category>;
    create(data: Partial<Category>): Promise<Category>;
    update(id: number, data: Partial<Category>): Promise<{
        id: number;
        name: string;
        description: string;
        createdAt: Date;
    } & Category>;
    remove(id: number): Promise<Category>;
}
