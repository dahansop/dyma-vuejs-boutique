<template>
  <div>
    <ShopProductList 
    :products="products"
    @add-product-to-cart="emit('addProductToCart', $event)"/>
  </div>
</template>

<script setup lang="ts">
import ShopProductList from './ShopProductList.vue';
import type { IProduct } from './interfaces/product.interface.ts';

defineProps<{
  products: IProduct[]
}>();

const emit = defineEmits<{
  (e: 'addProductToCart', productId: number): void;
}>();

</script>

<style lang="scss" scoped></style>