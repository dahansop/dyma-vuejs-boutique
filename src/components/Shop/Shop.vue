<template>
  <div class="d-flex flex-row">
    <shopFilters 
      calss="shop-filter"
      :filters="filters"
      :nbr-of-products="products.length"
      @update-filter="emit('updateFilter', $event)"/>
    <ShopProductList 
      class="flex-fill"
      :products="products"
      @add-product-to-cart="emit('addProductToCart', $event)"/>
  </div>
</template>

<script setup lang="ts">
import ShopProductList from './ShopProductList.vue';
import shopFilters from './ShopFilters.vue';
import type { IProduct, IFilters, IFilterUpdate } from './interfaces';

defineProps<{
  products: IProduct[],
  filters: IFilters
}>();

const emit = defineEmits<{
  (e: 'addProductToCart', productId: number): void;
  (e: 'updateFilter', filter: IFilterUpdate): void;
}>();

</script>

<style lang="scss" scoped>
.shop-filter {
  flex: 0 0 200px;
}
</style>