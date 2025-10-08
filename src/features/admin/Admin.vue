<template>
  <div class="admin-container d-flex flex-row justify-content-center align-items-center p-20">
    <ProductForm />
  </div>
</template>

<script setup lang="ts">
import ProductForm from './components/Productform.vue'; 
</script>


<style scoped lang="scss">
.admin-container {
  height: 100%;
}
</style>