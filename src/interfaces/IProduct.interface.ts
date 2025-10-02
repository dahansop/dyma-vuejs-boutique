import type CategoECategoriesries from "./ECategories.enum";

export interface IProduct {
    _id: string;
    createdAt: string;
    title: string;
    image: string;
    description: string;
    price: number;
    category: ECategories;
}