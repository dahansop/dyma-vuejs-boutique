<template>
  <div class="d-flex flex-column">
    <CartProduct 
      v-for="product in cart" :product="product"
      @remove-product-to-cart="emit('removeProductToCart', $event)"/>
  </div>
</template>

<script setup lang="ts">
import CartProduct from './CartProduct.vue';
import type { IProductCart } from './interfaces';

defineProps<{
  cart: IProductCart[]
}>();

const emit = defineEmits<{
  (e: 'removeProductToCart', productId: number): void;
}>();

</script>

<style lang="scss" scoped></style>