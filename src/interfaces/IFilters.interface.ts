import type ECategories from "./ECategories.enum";

export interface IFilters {
    title: string;
    priceRange: [number, number];
    category: ECategories;
}
