<template>
  <header class="px-20 d-flex flex-row align-items-center">
    <a href="#" class="d-flex flex-row align-items-center mr-20">
      <img src="../assets/logo.svg" />
      <span class="logo">Dyma</span>
    </a>

    <div class="d-flex flex-row align-items-center flex-fill actions-container">
      <!-- Menu PC -->
      <ul class="d-flex flex-row flex-fill hide-xs">
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
      <ul class="d-flex flex-row hide-xs">
        <li class="mr-10">
          <a href="#">Inscription</a>
        </li>
        <li>
          <a href="#">Connexion</a>
        </li>
      </ul>
      <!-- Menu mobile -->
      <div class="menu-xs-container">
        <Calc 
          :open="state.openMenu"
          :transparent="true"
          @close="state.openMenu = false" />
        <i class="fa-solid fa-bars show-xs"
          @click="state.openMenu = !state.openMenu">
        </i>
        <Transition>
          <ul @click="state.openMenu = false" v-if="state.openMenu" class="menu card">
            <li>
              <a 
                :class="{ active: page === EPages.BOUTIQUE}" 
                @click="emit('navigate', EPages.BOUTIQUE)">Boutique</a>
            </li>
            <li>
              <a 
                :class="{ active: page === EPages.ADMIN}"
                @click="emit('navigate', EPages.ADMIN)">Admin</a>
            </li>
            <li>
              <a href="#">Inscription</a>
            </li>
            <li>
              <a href="#">Connexion</a>
            </li>
          </ul>
        </Transition>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { EPages } from '@/interfaces/EPages.enum.ts';
import { reactive } from 'vue';
import Calc from '@/components/Calc.vue';

defineProps<{
  page: EPages
}>();

const emit = defineEmits<{
  (e: 'navigate', page: EPages): void;
}>();

const state = reactive<{
  openMenu: boolean;
}>({
  openMenu: false,
});


</script>

<style lang="scss" scoped>
@use '@/assets/scss/mixins';

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

  .actions-container {
    @include mixins.xs {
      justify-content: end;
    }
  }

  i {
    @include mixins.sm {
      display: none;
    }
    justify-self: end;
    color: #FFFFFF;
    font-size: 20px;
    cursor: pointer;
  }

  .menu-xs-container {
    position: relative;
  }

  .menu {
    z-index: 2;
    position: absolute;
    top: 20px;
    right: 0px;
    li {
      padding: 10px;
    }
    a {
      color: var(--text-color);
    }
  }
}

.v-leave-to,
.v-enter-from {
  transform: translateY(-10px);
  opacity: 0;
}

.v-leave-active,
.v-enter-active {
  transition: all 0.2s;
}

</style>