import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

// Cria a aplicação
const app = createApp(App);

// Instala os plugins
app.use(createPinia()); // Importante: Pinia antes do Router (pq o router usa a store)
app.use(router);

// Monta na tela
app.mount('#app');