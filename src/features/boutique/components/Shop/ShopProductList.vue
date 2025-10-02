<template>
  <div class="grid p-20">
    <ShopProduct
      v-for="product in products"
      :product="product"
      :key="product._id"
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
@use '@/assets/scss/mixins' as m;
.grid {
  display: grid;
  grid-auto-rows: 400px;
  gap: 20px;
  grid-template-columns: 1fr;
  @include m.md {
    grid-template-columns: 1fr 1fr;
  }
  @include m.lg {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @include m.xl {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}
</style>