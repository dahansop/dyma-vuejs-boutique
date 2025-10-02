<template>
  <div class="p-20 d-flex flex-column">
    <section class="mb-20">
      <h3 class="mb-10">Filtrer par titre</h3>
      <input
        :value="filters.title"
        @input="emit('updateFilter', { title: ($event.target as HTMLInputElement).value })"
        type="text"
        placeholder="Rechercher"
      />
    </section>
    <section class="mb-20">
      <h3 class="mb-10">Filtrer par prix</h3>
      <div class="mb-5" v-for="priceRange in ([[0, 10000], [800, 1000], [1000, 1500], [1500, 2000], [2000, 10000]] as [number, number][])"
        :key="priceRange[0]">
        <input 
          type="radio"
          name="priceRange"
          :id="priceRange[0].toString()" 
          :checked="filters.priceRange[0] === priceRange[0]"
          @input="emit('updateFilter', {priceRange})"/>
        <label :for="priceRange[0].toString()">
          {{ priceRange[0] === 0 
          ?'Tous les prix' 
          : priceRange[0] === 2000 
            ? 'Plus de 2000€' 
            : 'Entre ' + priceRange[0] + '€ et ' + priceRange[1] + '€'}}</label>
      </div>
    </section>
    <section class="mb-20 flex-fill">
      <h3 class="mb-10">Filtrer par catégorie</h3>
      <div class="mb-5" v-for="category in categories" :key="category">
        <input 
          type="radio"
          name="catogry"
          :id="category" 
          :checked="filters.category === category"
          @input="emit('updateFilter', {category})"/>
        <label :for="category">{{ category }}</label>
      </div>
    </section>
    <small class="mb-5">
      Nombre de résultats:
      <strong>{{ nbrOfProducts }}</strong>
    </small>
    <button class="btn btn-danger" @click="emit('updateFilter', {})">Supprimer les filtres</button>
  </div>
</template>

<script setup lang="ts">
import type { IFilters, IFilterUpdate } from './interfaces';
import { ECategories } from '@/interfaces/ECategories.enum.ts';

defineProps<{
  filters: IFilters;
  nbrOfProducts: number;
}>();

const emit = defineEmits<{
  (e: 'updateFilter', filter: IFilterUpdate): void;
}>();

const categories = Object.values(ECategories);

</script>

<style lang="scss" scoped></style>