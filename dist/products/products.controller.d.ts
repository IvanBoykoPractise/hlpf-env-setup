import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly service;
    constructor(service: ProductsService);
    findAll(): Promise<import("./product.entity").Product[]>;
    findOne(id: number): Promise<import("./product.entity").Product>;
    create(body: any): Promise<import("./product.entity").Product[]>;
    update(id: number, body: any): Promise<any>;
    remove(id: number): Promise<import("./product.entity").Product>;
}
