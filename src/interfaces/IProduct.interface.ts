import type CategoECategoriesries from "./ECategories.enum";

export interface IProduct {
    id: number;
    title: string;
    image: string;
    description: string;
    price: number;
    category: ECategories;
}