<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import OrderService from '../services/OrderService';

const router = useRouter();
const loading = ref(false);

const form = reactive({
  clientName: '',
  items: [
    { product: '', qty: 1, price: 0 } 
  ]
});

const calculatedTotal = computed(() => {
  return form.items.reduce((acc, item) => acc + (item.qty * item.price), 0);
});

function addItem() {
  form.items.push({ product: '', qty: 1, price: 0 });
}

function removeItem(index: number) {
  if (form.items.length > 1) {
    form.items.splice(index, 1);
  }
}

async function handleSubmit() {
  if (!form.clientName) return alert('Preencha o nome do cliente');
  
  loading.value = true;
  
  try {
    await OrderService.create({
      clientName: form.clientName,
      status: 'PENDENTE',
      total: calculatedTotal.value,
      date: new Date().toISOString(),
      items: form.items.map(i => ({
        product: i.product,
        qty: i.qty
      }))
    });

    alert('Pedido criado com sucesso!');
    router.push('/orders'); 
  } catch (error) {
    console.error(error);
    alert('Erro ao criar pedido.');
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="form-container">
    <header>
      <h2>Novo Pedido</h2>
      <button @click="router.back()" class="btn-secondary">Voltar</button>
    </header>

    <form @submit.prevent="handleSubmit" class="card">
    <div class="form-section">
  <label for="clientName">Nome do Cliente</label>
  
  <input 
    id="clientName" 
    v-model="form.clientName" 
    type="text" 
    placeholder="Ex: Empresa Tech Solutions" 
    required 
  />
  </div>

      <div class="form-section">
        <div class="items-header">
          <h3>Itens do Pedido</h3>
          <button type="button" @click="addItem" class="btn-small">+ Adicionar Item</button>
        </div>
        
        <div v-for="(item, index) in form.items" :key="index" class="item-row">
          <div class="col-grow">
            <input 
              v-model="item.product" 
              type="text" 
              placeholder="Nome do produto" 
              required 
            />
          </div>
          
          <div class="col-small">
            <input 
              v-model.number="item.qty" 
              type="number" 
              min="1" 
              placeholder="Qtd" 
              required
            />
          </div>

          <div class="col-medium">
            <input 
              v-model.number="item.price" 
              type="number" 
              min="0" 
              step="0.01"
              placeholder="Preço (R$)" 
              required
            />
          </div>

          <button 
            type="button" 
            @click="removeItem(index)" 
            class="btn-icon" 
            :disabled="form.items.length === 1"
            title="Remover item"
          >
            &times;
          </button>
        </div>
      </div>

      <div class="footer">
        <div class="total-box">
          <span>Total Estimado:</span>
          <strong>
            {{ calculatedTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
          </strong>
        </div>
        
        <button type="submit" class="btn-primary" :disabled="loading">
          {{ loading ? 'Salvando...' : 'Finalizar Pedido' }}
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.form-container { max-width: 800px; margin: 2rem auto; padding: 0 1rem; }

header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
h2 { color: var(--primary-color); margin: 0; } /* Azul da marca */

.card { background: white; padding: 2rem; border-radius: 8px; box-shadow: var(--shadow-sm); }

.form-section { margin-bottom: 2rem; }
.items-header { display: flex; justify-content: space-between; margin-bottom: 1rem; align-items: center; }

label { display: block; margin-bottom: 0.5rem; font-weight: 600; color: var(--text-main); }
input { padding: 0.75rem; border: 1px solid var(--border-color); border-radius: 4px; font-size: 1rem; width: 100%; }

/* Grid da Linha de Itens */
.item-row { display: flex; gap: 10px; margin-bottom: 0.8rem; align-items: center; }
.col-grow { flex: 2; }   /* Produto ocupa mais espaço */
.col-medium { flex: 1; } /* Preço ocupa espaço médio */
.col-small { width: 80px; } /* Qtd é pequeno */

.btn-icon { 
  background: #fee2e2; 
  color: #ef4444; 
  border: none; 
  width: 36px; height: 36px; 
  border-radius: 4px; 
  cursor: pointer; 
  font-size: 1.2rem;
  display: flex; align-items: center; justify-content: center;
}
.btn-icon:disabled { opacity: 0.3; cursor: not-allowed; background: #eee; color: #999; }

.btn-small { 
  background: #e0f2fe; 
  color: var(--primary-color); 
  border: none; 
  padding: 0.5rem 1rem; 
  border-radius: 4px; 
  cursor: pointer; 
  font-weight: 600; 
}
.btn-small:hover { background: #bae6fd; }

.footer { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 1.5rem; margin-top: 1rem; }

.total-box { display: flex; flex-direction: column; }
.total-box span { color: var(--text-light); font-size: 0.9rem; }
.total-box strong { color: var(--primary-color); font-size: 1.4rem; }

.btn-primary { 
  background: var(--accent-color); /* Bordô */
  color: white; 
  border: none; 
  padding: 0.85rem 2rem; 
  border-radius: 6px; 
  font-weight: 600; 
  cursor: pointer; 
  transition: opacity 0.2s;
}
.btn-primary:hover:not(:disabled) { opacity: 0.9; }

.btn-secondary { background: transparent; border: 1px solid var(--border-color); color: var(--text-light); padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; }
</style>