import type { IFilters } from '../../../interfaces';
import type ECategories from "@/interfaces/ECategories.enum.ts";

export const DEFAULT_FILTER:IFilters = {
    title: '',
    priceRange: [0, 10000],
    category: 'All'
}