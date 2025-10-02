<template>
  <div 
  class="app-container"
  :class="{
    cartEmpty: cartEmpty
  }">
    <TheHeader class="header" />
    <Shop 
      class="shop"
      :products="state.products"
      @add-product-to-cart="addProductToCart"/>
    <Cart 
      v-if="!cartEmpty"
      class="cart"
      :cart="state.cart"
      @remove-product-to-cart="removeProductToCart"/>
    <TheFooter class="footer" />
  </div>
</template>

<script setup lang="ts">
import TheHeader from './components/Header.vue';
import TheFooter from './components/Footer.vue';
import Shop from './components/Shop/Shop.vue';
import Cart from './components/Cart/Cart.vue';
import type { IProduct, IProductCart } from './interfaces';
import data from './data/productListData';

import { reactive, computed } from 'vue';

const state = reactive<{
  products: IProduct[],
  cart: IProductCart[]
}>({
  products: data,
  cart: []
});

const cartEmpty = computed(() => state.cart.length === 0);

function addProductToCart(productId: number): void {
  const product = state.products.find((product) => product.id === productId);
  if (product) {
    const productCart = state.cart.find((product) => product.id === productId);
    if (productCart) {
      productCart.quantity++;
    } else {
      state.cart.push({ ...product, quantity : 1 });
    }
  }
}

function removeProductToCart(productId: number): void {
  const productCart = state.cart.find((product) => product.id === productId);
  if (productCart?.quantity === 1) {
    state.cart = state.cart.filter((product) => product.id !== productId);
  } else {
    productCart.quantity--;
  }
}

</script>


<style lang="scss">
.app-container {
  min-height: 100vh;
  display: grid;
  grid-template-areas: 'header header' 'shop cart' 'footer footer';
  grid-template-columns: 75% 25%;
  grid-template-rows: 48px auto 48px;
}

.cartEmpty {
  grid-template-areas: 'header' 'shop' 'footer';
  grid-template-columns: 100%;
}

.header {
  grid-area: header;
}

.shop {
  grid-area: shop;
}

.cart {
  grid-area: cart;
  border-left: var(--border);
  background-color: #ffffff;
}

.footer {
  grid-area: footer;
}
</style>