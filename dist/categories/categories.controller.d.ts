import { CategoriesService } from './categories.service';
export declare class CategoriesController {
    private readonly service;
    constructor(service: CategoriesService);
    findAll(): Promise<import("./category.entity").Category[]>;
    findOne(id: number): Promise<import("./category.entity").Category>;
    create(body: any): Promise<import("./category.entity").Category>;
    update(id: number, body: any): Promise<{
        id: number;
        name: string;
        description: string;
        createdAt: Date;
    } & import("./category.entity").Category>;
    remove(id: number): Promise<import("./category.entity").Category>;
}
