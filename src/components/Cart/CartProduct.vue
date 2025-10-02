<template>
  <div class="mb-10 p-10 d-flex flex-row align-items-center product">
    <strong class="mr-10">{{ product.title }}</strong>
    <span class="flex-fill mr-10">x {{ product.quantity }}</span>
    <span class="mr-10">Prix : {{ product.price }}€</span>
    <button class="btn btn-danger" @click="emit('removeProductToCart', product.id)">Supprimer</button>
  </div>
</template>

<script setup lang="ts">
import type { IProductCart } from './interfaces';

defineProps<{
  product: IProductCart
}>();

const emit = defineEmits<{
  (e: 'removeProductToCart', productId: number): void;
}>();

</script>

<style lang="scss" scoped>
.product {
  border: var(--border);
  border-radius: var(--border-radius);
  background-color: var(--gray-1);
}
</style>