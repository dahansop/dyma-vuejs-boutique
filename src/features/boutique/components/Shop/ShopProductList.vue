<template>
  <div ref="scrollablediv" class="d-flex flex-column p-20">
    <div class="grid mb-20">
      <ShopProduct
        v-for="product in products"
        :product="product"
        :key="product._id"
        @add-product-to-cart="emit('addProductToCart', $event)"/>
    </div>
    <div v-if="isMoreResults" class="d-flex flex-row align-items-center justify-content-center">
      <button @click="emit('incPage')" class="btn btn-primary">
        Charger plus de produits
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import ShopProduct from './ShopProduct.vue';
import type { IProduct } from './interfaces/product.interface.ts';
import { pageKey } from '@/shared/injectionKeys/pageKey';
import { inject, ref, watch } from 'vue';

defineProps<{
  products: IProduct[],
  isMoreResults: boolean,
}>();

const emit = defineEmits<{
  (e: 'addProductToCart', productId: number): void;
  (e: 'incPage'): void;
}>();

const page = inject(pageKey)!;
const scrollablediv = ref<HTMLDivElement | null>(null);

// lorsque la pagination est reset, on remet la barre des croll en haut de la page
watch(page, () => {
  if (page.value === 1) {
    scrollablediv.value?.scrollTo(0, 0);
  }
});

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