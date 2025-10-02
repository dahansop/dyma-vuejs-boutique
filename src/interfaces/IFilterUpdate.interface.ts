import type ECategories from "./ECategories.enum";

export interface IFilterUpdate {
  title?: string;
  priceRange?: [number, number];
  category?: ECategories;
}