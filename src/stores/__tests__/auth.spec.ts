import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useAuthStore } from '../auth';

// --- MOCK DO LOCALSTORAGE ---
// Criamos um objeto falso para simular o navegador
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();

// Injetamos esse objeto falso no ambiente de teste
vi.stubGlobal('localStorage', localStorageMock);
// ----------------------------

describe('AuthStore', () => {
  beforeEach(() => {
    // Reseta o Pinia e o LocalStorage antes de cada teste
    setActivePinia(createPinia());
    localStorage.clear();
  });

  it('deve iniciar com estado de não-autenticado', () => {
    const authStore = useAuthStore();
    
    expect(authStore.user).toBeNull();
    expect(authStore.token).toBeNull();
    expect(authStore.isAuthenticated).toBe(false);
  });

  it('deve limpar dados ao fazer logout', () => {
    const authStore = useAuthStore();
    
    // 1. Simula um usuário logado "na força bruta"
    authStore.token = 'fake-token';
    // @ts-ignore (ignoramos o erro de tipagem parcial aqui só pro teste)
    authStore.user = { id: 1, name: 'Teste' };

    // 2. Executa a ação de Logout
    authStore.logout();

    // 3. Verifica se limpou tudo
    expect(authStore.token).toBeNull();
    expect(authStore.user).toBeNull();
  });
});