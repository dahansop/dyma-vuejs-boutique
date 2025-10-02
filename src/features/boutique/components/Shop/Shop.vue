<template>
  <div class="d-flex flex-row">
    <shopFilters 
      calss="shop-filter"
      :filters="filters"
      :nbr-of-products="products.length"
      @update-filter="emit('updateFilter', $event)"/>
    <ShopProductList 
      class="flex-fill scrollable"
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
  (e: 'addProductToCart', productId: string): void;
  (e: 'updateFilter', filter: IFilterUpdate): void;
}>();

</script>

<style lang="scss" scoped>
.shop-filter {
  flex: 0 0 200px;
}

.scrollable {
  overflow-y: auto;
  height: calc(100vh - 48px);
}
</style>