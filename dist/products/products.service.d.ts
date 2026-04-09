import { Repository } from 'typeorm';
import { Product } from './product.entity';
export declare class ProductsService {
    private readonly repo;
    constructor(repo: Repository<Product>);
    findAll(): Promise<Product[]>;
    findOne(id: number): Promise<Product>;
    create(data: any): Promise<Product[]>;
    update(id: number, data: any): Promise<any>;
    remove(id: number): Promise<Product>;
}
