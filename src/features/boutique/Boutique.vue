<template>
  <div class="boutique-container" :class="{ 'grid-empty': cartEmpty }">
    <Shop 
      :products="filteredProducts"
      :filters="state.filters"
      @add-product-to-cart="addProductToCart"
      @update-filter="updateShopFilters" />
    <Cart 
      v-if="!cartEmpty"
      class="cart"
      :cart="state.cart"
      @remove-product-to-cart="removeProductToCart" />
  </div>
</template>

<script setup lang="ts">
import Shop from './components/Shop/Shop.vue';
import Cart from './components/Cart/Cart.vue';
import type { IProduct, IProductCart, IFilters, IFilterUpdate } from '../../interfaces';
import { ECategories } from '@/interfaces/ECategories.enum.ts';
import { DEFAULT_FILTER } from './data/filtersProduct';
import { reactive, computed, inject } from 'vue';

// URL de l'APi produit
const urlApiProduct = inject<String>('PRODUCT_API_URL')!;

// définition du contexte
const state = reactive<{
  products: IProduct[],
  cart: IProductCart[],
  filters: IFilters
}>({
  products: [],
  cart: [],
  filters: {...DEFAULT_FILTER}
});

// récuparation de la liste des produits depuis l'API
const listProducts = await (await fetch(urlApiProduct)).json();
if (Array.isArray(listProducts)) {
  state.products = listProducts;
} else {
  state.products = [listProducts];
}

// indique si le panier est vide
const cartEmpty = computed(() => state.cart.length === 0);

// liste des produits avec filtres appliqués
const filteredProducts = computed(() => {
  return state.products.filter((product) => {
      return (product.title.toLocaleLowerCase().startsWith(state.filters.title.toLocaleLowerCase())
        && product.price >= state.filters.priceRange[0]
        && product.price <= state.filters.priceRange[1]
        && (product.category === state.filters.category || state.filters.category === ECategories.ALL)
      );
  });
});

// Ajoute un produit dans le panier
function addProductToCart(productId: string): void {
  const product = state.products.find((product) => product._id === productId);
  if (product) {
    const productCart = state.cart.find((product) => product._id === productId);
    if (productCart) {
      productCart.quantity++;
    } else {
      state.cart.push({ ...product, quantity : 1 });
    }
  }
}

// supprime un produit du panier
function removeProductToCart(productId: string): void {
  const productCart = state.cart.find((product) => product._id === productId);
  if (productCart?.quantity === 1) {
    state.cart = state.cart.filter((product) => product._id !== productId);
  } else {
    productCart.quantity--;
  }
}

// Met à jour les filtres de recherche sur les produits
function updateShopFilters(filters: IFilterUpdate): void {
  if (filters.title !== undefined) {
    state.filters.title = filters.title;
  }else if (filters.priceRange !== undefined) {
    state.filters.priceRange = filters.priceRange;
  }else if (filters.category !== undefined) {
    state.filters.category = filters.category;
  } else {
    state.filters = { ...DEFAULT_FILTER };
  }
}
</script>


<style scoped lang="scss">
.boutique-container {
  display: grid;
  grid-template-columns: 75% 25%;
}

.grid-empty {
  grid-template-columns: 100%;
}

.cart {
  background-color: white;
  border-left: var(--border);
}
</style>