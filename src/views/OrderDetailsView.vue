<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import OrderService from '../services/OrderService';
import type { OrderDTO } from '../dtos/OrderDTO';

const route = useRoute();
const router = useRouter();
const order = ref<OrderDTO | null>(null);
const loading = ref(true);
const error = ref(false);

onMounted(async () => {
  const id = Number(route.params.id);

  try {
    order.value = await OrderService.getById(id);
  } catch (err: unknown) {
    console.error('Failed to fetch order:', err);
    error.value = true;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="page-container">
    <div v-if="loading" class="loading">Carregando detalhes...</div>

    <div v-else-if="error || !order" class="error-state">
      <h3>Pedido não encontrado</h3>
      <button @click="router.push('/orders')" class="btn-back">Voltar para a lista</button>
    </div>

    <div v-else class="details-card">
      <header class="card-header">
        <div class="header-left">
          <button @click="router.back()" class="btn-back-link">← Voltar</button>
          <div class="title-group">
            <h2>Pedido #{{ order.id }}</h2>
            <span class="date">{{ order.dateFormatted }}</span>
          </div>
        </div>
        
        <span 
          class="status-badge" 
          :style="{ backgroundColor: order.statusColor }"
        >
          {{ order.status }}
        </span>
      </header>

      <div class="divider"></div>

      <section class="info-grid">
        <div class="info-group">
          <label>Cliente</label>
          <p>{{ order.client }}</p>
        </div>
        
        <div class="info-group">
          <label>Total do Pedido</label>
          <p class="total-text">{{ order.totalFormatted }}</p>
        </div>
      </section>

      <section class="items-list">
        <h3>Itens Comprados</h3>
        <table>
          <thead>
            <tr>
              <th>Produto</th>
              <th class="text-right">Qtd</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in order.items" :key="index">
              <td>{{ item.product }}</td>
              <td class="text-right">{{ item.qty }}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </div>
</template>

<style scoped>
.page-container { max-width: 800px; margin: 2rem auto; padding: 0 1rem; }

.details-card { background: white; border-radius: 8px; box-shadow: var(--shadow-sm); padding: 2rem; }

/* Header */
.card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem; }
.header-left { display: flex; flex-direction: column; gap: 0.5rem; }

.btn-back-link { 
  background: none; border: none; color: var(--text-light); 
  cursor: pointer; font-size: 0.9rem; padding: 0; text-align: left; 
}
.btn-back-link:hover { color: var(--primary-color); text-decoration: underline; }

.title-group h2 { margin: 0; color: var(--primary-color); }
.title-group .date { color: var(--text-light); font-size: 0.9rem; }

.status-badge { 
  padding: 6px 16px; border-radius: 99px; color: white; 
  font-weight: 600; font-size: 0.85rem; text-transform: uppercase; 
}

.divider { height: 1px; background-color: var(--border-color); margin: 1.5rem 0; }

/* Grid de Info */
.info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2rem; }
.info-group label { display: block; color: var(--text-light); font-size: 0.85rem; margin-bottom: 0.25rem; text-transform: uppercase; font-weight: 600; }
.info-group p { margin: 0; font-size: 1.1rem; color: var(--text-main); font-weight: 500; }
.total-text { font-weight: 700 !important; color: var(--primary-color) !important; font-size: 1.4rem !important; }

/* Tabela de Itens */
.items-list h3 { font-size: 1rem; color: var(--text-main); margin-bottom: 1rem; border-left: 4px solid var(--accent-color); padding-left: 0.5rem; }

table { width: 100%; border-collapse: collapse; }
th { text-align: left; color: var(--text-light); font-size: 0.85rem; padding-bottom: 0.5rem; border-bottom: 2px solid #f1f5f9; text-transform: uppercase; }
td { padding: 0.75rem 0; border-bottom: 1px solid #f1f5f9; color: var(--text-main); }
.text-right { text-align: right; }

/* Estados de Carga e Erro */
.loading { text-align: center; padding: 3rem; color: var(--text-light); }
.error-state { text-align: center; padding: 3rem; color: var(--status-danger); }
.btn-back { background: var(--secondary-color); color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; margin-top: 1rem; }
</style>