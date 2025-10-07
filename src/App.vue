<template>
  <div class="app-container">
    <TheHeader class="header"
      :page="state.page" 
      @navigate="navigate"/>
    <div class="app-content">
      <Suspense>
        <Component :is="pages[state.page]" />
      <template #fallback>
        Chargement des produits...
      </template>
    </Suspense>
    </div>
    <TheFooter class="footer" />
  </div>
</template>

<script setup lang="ts">
import TheHeader from './components/Header.vue';
import TheFooter from './components/Footer.vue';
import Boutique from './features/boutique/Boutique.vue';
import Admin from './features/admin/Admin.vue';
import { EPages } from '@/interfaces/EPages.enum.ts';
import { seed, seed40Products } from '@/data/seed';
import { reactive, type Component as C } from 'vue';

const state = reactive<{
  page: EPages
}>({
  page: EPages.BOUTIQUE
});

const pages: { [s:string]: C } = {
  Boutique,
  Admin,
};

function navigate(page: EPages): void {
  state.page = page;
}

// a ne lancer qu'une fois pour la création des produits. (ils sont détruits toutes les 10 heures)
//seed();
//seed40Products();
</script>



<style lang="scss">
.app-container {
  height: 100vh;
  display: grid;
  grid-template-areas: 'header' 'app-content' 'footer';
  grid-template-rows: 48px auto 48px;
}

.header {
  grid-area: header;
}

.app-content {
  grid-area: app-content;
}

.footer {
  grid-area: footer;
}
</style>