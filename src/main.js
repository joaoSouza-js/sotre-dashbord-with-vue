import JsonExcel from "vue-json-excel3";

import './styles/global.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

// Register the JsonExcel component globally (or locally where needed)
app.component("downloadExcel", JsonExcel);
app.use(router);

app.mount('#app');

