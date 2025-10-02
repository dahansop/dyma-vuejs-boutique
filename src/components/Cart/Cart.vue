<template>
  <div class="p-20 d-flex flex-column">
    <h2 class="mb-10">Panier</h2>
    <CartProductList 
      class="flex-fill"
      :cart="cart"
      @remove-product-to-cart="emit('removeProductToCart', $event)"/>
    <button class="btn btn-success">Commander ({{ totalPrice }}€)</button>
  </div>
</template>

<script setup lang="ts">
import CartProductList from './CartProductList.vue';
import type { IProductCart } from './interfaces';

import { computed } from 'vue';

const props = defineProps<{
  cart: IProductCart[]
}>();

const emit = defineEmits<{
  (e: 'removeProductToCart', productId: number): void;
}>();

const totalPrice = computed(() => 
  props.cart.reduce((acc, product) => acc + product.price * product.quantity, 0)
);

</script>

<style lang="scss" scoped></style>