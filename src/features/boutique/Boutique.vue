<template>
  <div class="d-flew flex-column">
    <Shop 
      :products="filteredProducts"
      :filters="state.filters"
      :is-more-results="state.isMoreResults"
      @add-product-to-cart="addProductToCart"
      @update-filter="updateShopFilters"
      @inc-page="state.page++" />
    <Cart
      v-if="!cartEmpty"
      :cart="state.cart"
      @remove-product-to-cart="removeProductToCart" />
  </div>
</template>

<script setup lang="ts">
import Shop from './components/Shop/Shop.vue';
import Cart from './components/Cart/Cart.vue';
import type { IProduct, IProductCart, IFilters, IFilterUpdate } from '@/interfaces';
import { ECategories } from '@/interfaces/ECategories.enum.ts';
import { DEFAULT_FILTER } from './data/filtersProduct';
import { fetchProducts } from '@/shared/services/products.service';
import { pageKey } from '@/shared/injectionKeys/pageKey';
import { reactive, computed, watchEffect, watch, provide, toRef } from 'vue';


// définition du contexte
const state = reactive<{
  products: IProduct[];
  cart: IProductCart[];
  filters: IFilters;
  page: number;
  isMoreResults: boolean;
  isLoading: boolean;
}>({
  products: [],
  cart: [],
  filters: {...DEFAULT_FILTER},
  page: 1,
  isLoading: true,
  isMoreResults: true
});

// référence pour la page
provide(pageKey, toRef(state, 'page'));

// Réinitialise la pagination quand un filtre change
watch(state.filters, () => {
  state.page = 1;
  state.products = [];
  state.isMoreResults = true;
});

// Récupère la liste des produits depuis l'API. Vue la mets à jour à chaque modif du filtre
watchEffect(async () => {
  state.isLoading = true;
  const listProducts = await fetchProducts(state.filters, state.page);
  if (Array.isArray(listProducts)) {
    state.products = [...state.products, ...listProducts];
  } else {
    state.products = [...state.products, listProducts];
  }
  // TODO utiliser un paramètre dans l'application
  if (listProducts.length < 20) {
    state.isMoreResults = false;
  }

  state.isLoading = false;
});

// liste des produits avec filtres appliqués. applique uniquement le filtre du titre
// TODO a supprimer pour le mettre dans l'appel de l'API
const filteredProducts = computed(() => {
  return state.products.filter((product) => {
      return (product.title.toLocaleLowerCase().startsWith(state.filters.title.toLocaleLowerCase()));
  });
});

// indique si le panier est vide
const cartEmpty = computed(() => state.cart.length === 0);

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

</style>