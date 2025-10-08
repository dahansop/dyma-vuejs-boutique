<template>
  <div class="d-flex flex-row shop-container">
    <Calc 
      :open="state.isMobile && state.openFilters"
      :transparent="true"
      @close="state.openFilters = false"/>
    <Transition>
      <shopFilters 
        v-if="state.openFilters"
        class="shop-filter"
        :filters="filters"
        :nbr-of-products="products.length"
        @update-filter="emit('updateFilter', $event)"/>
    </Transition>

    <div class="d-flex flex-column">
      <button class="btn btn-primary d-flex flew-row justify-content-center align-items-center"
        @click="state.openFilters = !state.openFilters">
          <i class="fa-solid fa-magnifying-glass mr-10"></i>
          <span>Rechercher</span>
      </button>
      <ShopProductList 
        class="flex-fill scrollable"
        :products="products"
        :is-more-results="isMoreResults"
        @add-product-to-cart="emit('addProductToCart', $event)"
        @inc-page="emit('incPage')"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import ShopProductList from './ShopProductList.vue';
import shopFilters from './ShopFilters.vue';
import Calc from '@/components/Calc.vue';
import type { IProduct, IFilters, IFilterUpdate } from './interfaces';
import { reactive } from 'vue';

defineProps<{
  products: IProduct[],
  filters: IFilters,
  isMoreResults: boolean,
}>();

const emit = defineEmits<{
  (e: 'addProductToCart', productId: string): void;
  (e: 'updateFilter', filter: IFilterUpdate): void;
  (e: 'incPage'): void;
}>();

const state = reactive<{
  openFilters: boolean;
  isMobile: boolean;
}>({
  openFilters: !matchMedia('(max-width: 575px)').matches,
  isMobile: matchMedia('(max-width: 575px)').matches,
});

</script>

<style lang="scss" scoped>
@use '@/assets/scss/mixins';

button {
  margin: 20px 20px 10px 20px;
  @include mixins.sm {
    display: none;
  }
}

.shop-container {
  position: relative;
}

.shop-filter {
  flex: 0 0 200px;
  @include mixins.xs {
    position: absolute;
    top: 0px;
    left: 0px;
    background-color: #FFFFFF;
    z-index: 2;
  }
}

.scrollable {
  overflow-y: auto;
  height: calc(100vh - 48px);
}

.v-enter-from,
.v-leave-to {
  transform: translateX(-100%);
  opcity: 0;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.2s;
}
</style>