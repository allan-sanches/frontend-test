<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');

async function handleLogin() {
  const success = await authStore.login({
    email: email.value,
    password: password.value
  });

  if (success) {
    router.push('/orders');
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <h1>Be.<span class="highlight">Delivery</span></h1>
      <p class="subtitle">Entre com suas credenciais</p>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">E-mail</label>
          <input 
            id="email"
            v-model="email" 
            type="email" 
            placeholder="dev@teste.com"
            required
            autofocus
          />
        </div>

        <div class="form-group">
          <label for="password">Senha</label>
          <input 
            id="password"
            v-model="password" 
            type="password" 
            placeholder="123"
            required
          />
        </div>

        <div v-if="authStore.error" class="error-message">
          {{ authStore.error }}
        </div>

        <button type="submit" :disabled="authStore.loading">
          <span v-if="authStore.loading">Entrando...</span>
          <span v-else>Entrar</span>
        </button>
      </form>
      
      <div class="mock-hint">
        <small>Dica para teste: dev@teste.com / 123</small>
      </div>
    </div>
  </div>
</template>

<style scoped>

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--background-body);
  padding: 1rem; 
}

.login-card {
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: var(--shadow-md);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

h1 {
  margin-bottom: 0.5rem;
  color: var(--primary-color);
  font-size: 1.8rem;
}

.highlight {
  color: var(--accent-color); 
}

.subtitle {
  color: var(--text-light);
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-main);
  font-weight: 500;
  font-size: 0.9rem;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s;
  box-sizing: border-box; 
  color: var(--text-main);
}

input:focus {
  outline: none;
  border-color: var(--primary-color); 
  box-shadow: 0 0 0 2px rgba(30, 58, 69, 0.1);
}

button {
  width: 100%;
  padding: 0.85rem;
  background-color: var(--accent-color); 
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s, opacity 0.2s;
}

button:hover:not(:disabled) {
  background-color: var(--accent-hover);
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error-message {
  color: var(--status-danger);
  background-color: var(--danger-light); 
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.mock-hint {
  margin-top: 1.5rem;
  color: var(--text-light);
  font-size: 0.85rem;
  border-top: 1px solid var(--border-color);
  padding-top: 1rem;
}

@media (max-width: 480px) {
  .login-card {
    padding: 1.5rem; 
    box-shadow: none; 
    background: transparent; 
  
  h1 { font-size: 1.5rem; }
}
}
</style>