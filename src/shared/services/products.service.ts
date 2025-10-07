import type { IProduct, IFilters } from '@/interfaces';
import { ECategories } from '@/interfaces/ECategories.enum.ts';

const urlApiProduct = 'https://restapi.fr/api/dsprojetproducts2';

/**
 * récupère la liste des produit en y appliquant les filtres et la pagination
 */
export async function fetchProducts(filters: IFilters, page: number): Promise<IProduct | IProduct[]> {
    const nbProductByPage: number = 20; // TODO le mettre en parametre dans l'appli
    const searchParams = new URLSearchParams();

    // filtre de la pagination
    searchParams.append('limit', nbProductByPage.toString());
    if (page !== 1) {
      const skip: number = (page - 1) * nbProductByPage;
      searchParams.append('skip', skip.toString());
    }

    // filtre sur les produits
    if (filters.category !== ECategories.ALL) {
        searchParams.append('category', filters.category);
    }
    // TODO il faudra ajouter le filtre pour le titre
    /*if (filters.title !== '') {
        searchParams.append("title", filters.title);
    }*/
    searchParams.append('price', `{"$gte":${filters.priceRange[0]}, "$lte":${filters.priceRange[1]}}`)

    const listProducts = await (await fetch(`${urlApiProduct}?${searchParams}`)).json();
    return listProducts;
}

/**
 * Créer un produit dans la base
 */
export async function createProduct(product: string): Promise<IProduct> {
    const response = await fetch(urlApiProduct, {
      method: 'POST',
      // TODO a voir pour ecrire de meilleure facon
      //body: JSON.stringify(formValues),
      body: product,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    // recupération du produit
    const productCreated: IProduct = await response.json();

    return productCreated;
}