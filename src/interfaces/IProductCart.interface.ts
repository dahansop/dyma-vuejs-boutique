import type { IProduct } from "./IProduct.interface";

export interface IProductCart extends IProduct {
    quantity: number;
}