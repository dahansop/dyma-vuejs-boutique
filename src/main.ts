import './assets/scss/main.scss'
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App);

app.provide('PRODUCT_API_URL', 'https://restapi.fr/api/dsprojetproducts');

app.mount('#app');