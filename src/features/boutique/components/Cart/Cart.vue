<template>
  <Transition mode="out-in">
    <div class="cart-container">
      <div v-if="!state.openCart" 
        class="cart-holder d-flex flex-row justify-content-center align-items-center"
        @click="state.openCart = !state.openCart;">
        <span class="nb-product">{{ cart.length }}</span>
        <i class="fa-solid fa-cart-shopping"></i>
      </div>
      <div v-else>
        <Teleport to="body">
          <div class="calc"
            @click="state.openCart = false;"></div>
        </Teleport>
        <div class="p-20 ml-20 d-flex flex-column card">
          <h2 class="mb-10">Panier</h2>
          <CartProductList 
            class="flex-fill"
            :cart="cart"
            @remove-product-to-cart="emit('removeProductToCart', $event)"/>
          <button class="btn btn-success">Commander ({{ totalPrice }}€)</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import CartProductList from './CartProductList.vue';
import type { IProductCart } from './interfaces';
import { computed, reactive } from 'vue';

const props = defineProps<{
  cart: IProductCart[]
}>();

const emit = defineEmits<{
  (e: 'removeProductToCart', productId: string): void;
}>();

const totalPrice = computed(() => 
  props.cart.reduce((acc, product) => acc + product.price * product.quantity, 0)
);

const state = reactive<{
  openCart: boolean;
}>({
  openCart: false,
});

</script>

<style lang="scss" scoped>
.cart-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 2;
}

.cart-holder {
  position: relative;
  width: 50px;
  height: 50px;
  cursor: pointer;
  border-radius: 50%;
  background-color: var(--primary-1);
  transition: background-color 0.2s;
  &:hover {
    background-color: var(--primary-2);
  }

  i {
    font-size: 20px;
    color: var(--text-primary-color);
  }

  .nb-product {
    width: 15px;
    font-size: 10px;
    line-height: 15px;
    text-align: center;
    vertical-align: middle;
    border-radius: 50%;
    background-color: var(--danger-1);
    color: var(--text-primary-color);
    position: absolute;
    top: 0px;
    right: 0px;
  }
}

.v-enter-from,
.v-leave-to {
  transform: translateY(10px);
  opacity: 0;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.2s;
}
</style>