<template>
  <header class="px-20 d-flex flex-row align-items-center">
    <a href="#" class="d-flex flex-row align-items-center mr-20">
      <img src="../assets/logo.svg" />
      <span class="logo">Dyma</span>
    </a>
    <ul class="d-flex flex-row flex-fill">
      <li class="mr-10">
        <a 
          :class="{ active: page === EPages.BOUTIQUE}" 
          @click="emit('navigate', EPages.BOUTIQUE)">Boutique</a>
      </li>
      <li>
        <a 
          :class="{ active: page === EPages.ADMIN}"
          @click="emit('navigate', EPages.ADMIN)">Admin</a>
      </li>
    </ul>
    <ul class="d-flex flex-row">
      <li class="mr-10">
        <a href="#">Inscription</a>
      </li>
      <li>
        <a href="#">Connexion</a>
      </li>
    </ul>
  </header>
</template>

<script setup lang="ts">
import { EPages } from '@/interfaces/EPages.enum.ts';

defineProps<{
  page: EPages
}>();

const emit = defineEmits<{
  (e: 'navigate', page: EPages): void;
}>();

</script>

<style lang="scss" scoped>
header {
  background-color: var(--primary-1);
  a {
    color: var(--text-primary-color);
    img {
      width: 20px;
      margin-right: 5px;
    }
    .logo {
      font-weight: 700;
      font-size: 20px;
    }
  }
  a.active {
    text-decoration: underline;
  }
}
</style>