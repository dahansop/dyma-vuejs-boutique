<template>
  <div class="card">
    <h3 class="mb-10">Ajouter un produit</h3>
    <form @submit="submitProductForm">
      <div class="d-flex flex-column mb-20">
        <label class="mb-5">Titre*</label>
        <input v-model="title.value.value" type="text" ref="firstInput"/>
        <small class="form-error" v-if="title.errorMessage.value">{{ title.errorMessage.value }}</small>
      </div>
      <div class="d-flex flex-column mb-20">
        <label class="mb-5">Image*</label>
        <input v-model="image.value.value" type="text" />
        <small class="form-error" v-if="image.errorMessage.value">{{ image.errorMessage.value }}</small>
      </div>
      <div class="d-flex flex-column mb-20">
        <label class="mb-5">Description*</label>
        <textarea v-model="description.value.value" type="text"></textarea>
        <small class="form-error" v-if="description.errorMessage.value">{{ description.errorMessage.value }}</small>
      </div>
      <div class="d-flex flex-column mb-20">
        <label class="mb-5">Prix*</label>
        <input v-model="price.value.value" type="number" />
        <small class="form-error" v-if="price.errorMessage.value">{{ price.errorMessage.value }}</small>
      </div>
      <div class="d-flex flex-column mb-20">
        <label class="mb-5">Catégorie*</label>
        <select id="selectCategory" v-model="category.value.value">
          <template v-for="ecategory in ECategories" :key="ecategory">
            <option v-if="ecategory !== ECategories.ALL">{{ ecategory.valueOf() }}</option>
          </template>
        </select>
        <small class="form-error" v-if="category.errorMessage.value">{{ category.errorMessage.value }}</small>
      </div>
      <button class="btn btn-primary" :disabled="isSubmitting">Sauvegarder</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod';
import { useForm, useField } from 'vee-validate';
import { toFormValidator } from '@vee-validate/zod';
import { ECategories } from '@/interfaces/ECategories.enum.ts';
import { inject } from 'vue';

const urlApiProduct = inject<String>('PRODUCT_API_URL')!;

//const firstInput = ref<HTMLInputElement | null>(null);
//onMounted(() => {
//  firstInput.value?.focus();
//});

const validationSchema = z.object({
  title: z.string({ message: "Le champ est obligatoire" })
    .min(1, { message: "Le titre doit possèder au moins 1 caractères" })
    .max(20, { message: "Le titre ne peut pas dépasser les 20 caractères" }),
  image: z.string({ message: "Le champ est obligatoire" }),
  description: z.string({ message: "Le champ est obligatoire" })
    .min(10, { message: "La description doit possèder au moins 10 caractères" }),
  price: z.number({ message: "Le champ est obligatoire" })
    .positive({ message: "Le prix doit être supérieur à 0€" })
    .max(15000, { message: "Le prix ne peut pas dépasser les 15 000€" }),
  category: z.nativeEnum(ECategories, { message: "Le champ est obligatoire" })
});

const { handleSubmit, isSubmitting } = useForm({ validationSchema: toFormValidator(validationSchema) });

const title = useField('title');
const image = useField('image');
const description = useField('description');
const price = useField('price');
const category = useField('category');

const submitProductForm = handleSubmit(async (formValues, { resetForm }) => {
  try {
    const response = await fetch(urlApiProduct, {
      method: 'POST',
      body: JSON.stringify(formValues),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // recupération du produit
    const product: IProduct = await response.json();

    resetForm();
    //firstInput.value?.focus();
  } catch (e) {
    console.error(e);
  }

});

</script>

<style scoped lang="scss">
.card {
  width: 100%;
  max-width: 500px;
}
</style>