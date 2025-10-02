<template>
  <div class="grid p-20">
    <ShopProduct
      v-for="product in products"
      :product="product"
      :key="product.id"
      @add-product-to-cart="emit('addProductToCart', $event)"/>
  </div>
</template>

<script setup lang="ts">
import ShopProduct from './ShopProduct.vue';
import type { IProduct } from './interfaces/product.interface.ts';

defineProps<{
  products: IProduct[]
}>();

const emit = defineEmits<{
  (e: 'addProductToCart', productId: number): void;
}>();

</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-auto-rows: 400px;
  gap: 20px;
}
</style>