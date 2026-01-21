<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import OrderService from '../services/OrderService';
import type { OrderDTO } from '../dtos/OrderDTO';

const router = useRouter();
const authStore = useAuthStore();

const orders = ref<OrderDTO[]>([]);
const loading = ref(true);

onMounted(async () => {
  try {
    orders.value = await OrderService.getAll();
  } catch (error) {
    console.error('Failed to load orders:', error);
    alert('Erro ao carregar pedidos');
  } finally {
    loading.value = false;
  }
});

function handleLogout() {
  authStore.logout();
  router.push('/login');
}

function goToNewOrder() {
  router.push('/orders/new');
}

function goToDetails(id: number) {
  router.push(`/orders/${id}`);
}
</script>

<template>
  <div class="layout">
    <header class="navbar">
      <div class="brand">
        <h1>Be.<span class="highlight">Compliance</span></h1>
      </div>
      <div class="user-info">
        <span>Olá, <strong>{{ authStore.userName }}</strong></span>
        <button @click="handleLogout" class="btn-logout">Sair</button>
      </div>
    </header>

    <main class="container">
      <div class="page-header">
        <h2>Meus Pedidos</h2>
        <button @click="goToNewOrder" class="btn-primary">+ Novo Pedido</button>
      </div>

      <div v-if="loading" class="loading">Carregando pedidos...</div>

      <div v-else class="table-container">
        <table>
          <thead>
            <tr>
              <th>#ID</th>
              <th>Cliente</th>
              <th>Data</th>
              <th>Itens</th>
              <th>Total</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.id">
              <td data-label="ID" class="mono">#{{ order.id }}</td>
              
              <td data-label="Cliente" class="font-bold">{{ order.client }}</td>
              
              <td data-label="Data">{{ order.dateFormatted }}</td>
              
              <td data-label="Itens" class="text-muted">{{ order.itemsSummary }}</td>
              
              <td data-label="Total" class="mono">{{ order.totalFormatted }}</td>
              
              <td data-label="Status">
                <span 
                  class="badge" 
                  :style="{ backgroundColor: order.statusColor }"
                >
                  {{ order.status }}
                </span>
              </td>
              
              <td data-label="Ações">
                <button @click="goToDetails(order.id)" class="btn-link">Ver detalhes</button>
              </td>
            </tr>
          </tbody>
        </table>
        
        <div v-if="orders.length === 0" class="empty-state">
          Nenhum pedido encontrado.
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* --- Layout Base --- */
.layout { min-height: 100vh; background-color: var(--background-body); }
.container { max-width: 1000px; margin: 0 auto; padding: 2rem; }

/* --- Navbar --- */
.navbar {
  background: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: var(--shadow-sm);
  border-bottom: 1px solid var(--border-color);
}
.brand h1 { margin: 0; font-size: 1.5rem; color: var(--primary-color); }
.highlight { color: var(--accent-color); }

.user-info { display: flex; align-items: center; gap: 1rem; color: var(--text-main); }

.btn-logout { 
  background: transparent; 
  border: 1px solid var(--status-danger); 
  color: var(--status-danger); 
  padding: 0.5rem 1rem; 
  border-radius: 4px; 
  cursor: pointer; 
  transition: all 0.2s;
}
.btn-logout:hover { background: var(--status-danger); color: white; }

/* --- Cabeçalho da Página --- */
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
.page-header h2 { color: var(--primary-color); margin: 0; }

.btn-primary { 
  background: var(--accent-color); 
  color: white; 
  border: none; 
  padding: 0.75rem 1.5rem; 
  border-radius: 6px; 
  cursor: pointer; 
  font-weight: 600; 
  transition: background 0.2s;
  text-align: center;
}
.btn-primary:hover { background: var(--accent-hover); }

/* --- Tabela (Desktop Padrão) --- */
.table-container { 
  background: white; 
  border-radius: 8px; 
  box-shadow: var(--shadow-sm); 
  overflow: hidden; 
}

table { width: 100%; border-collapse: collapse; text-align: left; }

th { 
  background-color: #f8fafc; 
  color: var(--text-light); 
  padding: 1rem; 
  font-weight: 600; 
  font-size: 0.75rem; 
  text-transform: uppercase; 
  letter-spacing: 0.05em;
}

td { padding: 1rem; border-bottom: 1px solid var(--border-color); color: var(--text-main); vertical-align: middle; }
tr:last-child td { border-bottom: none; }

/* --- Utilitários de Texto e Badges --- */
.badge { padding: 4px 12px; border-radius: 20px; color: white; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; }
.btn-link { background: none; border: none; color: var(--primary-color); cursor: pointer; text-decoration: underline; font-size: 0.85rem; font-weight: 500; }
.btn-link:hover { color: var(--accent-color); }

.loading, .empty-state { text-align: center; padding: 3rem; color: var(--text-light); }
.font-bold { font-weight: 600; }
.text-muted { color: var(--text-light); font-size: 0.9rem; }
.mono { font-family: monospace; color: var(--text-light); }



/* Tablet (< 1024px) */
@media (max-width: 1024px) {
  .container { max-width: 100%; padding: 1.5rem; }
}

/* Mobile (< 768px) */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .user-info {
    width: 100%;
    justify-content: space-between;
  }

  .page-header {
    flex-direction: column;
    align-items: stretch; 
    gap: 1rem;
  }

  .btn-primary { width: 100%; }

  /* --- TRANSFORMAÇÃO TABELA -> CARDS --- */
  
 
  thead { display: none; }
  table, tbody, tr, td { display: block; width: 100%; }

  tr {
    margin-bottom: 1rem;
    background: white;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 1rem;
    box-shadow: var(--shadow-sm);
  }
  
 
  td {
    padding: 0.6rem 0;
    border-bottom: 1px solid #f1f5f9;
    text-align: right; 
    display: flex;
    justify-content: space-between; 
    align-items: center;
  }

  tr:last-child td { border-bottom: none; }

  /* Cria o Label falso baseado no atributo data-label */
  td::before {
    content: attr(data-label);
    font-weight: 600;
    color: var(--text-light);
    font-size: 0.75rem;
    text-transform: uppercase;
    text-align: left;
  }
  

  .font-bold { text-align: right; }
}
</style>