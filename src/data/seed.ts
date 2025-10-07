import data from './productListData';

const urlApiProduct = 'https://restapi.fr/api/dsprojetproducts2';
const urlApiGenerator = 'https://restapi.fr/generator';

/*export async function seed(collectionName: string) {
  await fetch(`https://restapi.fr/api/${collectionName}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}*/

/**
 * Importe les produit du fichier productListData dans l'api rest
 */
export async function seed() {
  await fetch(urlApiProduct, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

/**
 * Génère 40 produits à l'aide de l'APi generator
 */
export async function seed40Products() {
  await fetch(urlApiGenerator, {
    method: 'POST',
    body: JSON.stringify({
      times: 40,
      resourceName: apiName,
      title: 'name',
      image: {
        type: 'image',
        theme: 'computer',
        height: 200,
        width: 300,
      },
      category: {
        type: 'collection',
        values: ['Gamer', 'Desktop', 'Streaming'],
        unique: false,
      },
      description: {
        type: 'sentence',
        range: [9, 12],
      },
      price: {
        type: 'number',
        range: [800, 2500],
      },
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}