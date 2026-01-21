import { defineStore } from 'pinia';
import AuthService from '../services/AuthService';
import type { UserDTO } from '../dtos/UserDTO';
import type { ILoginCredentials } from '../interfaces/IAuth';

interface AuthState {
  user: UserDTO | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
  }),

    getters: {
    isAuthenticated: (state): boolean => !!state.token,
    userName: (state): string => state.user?.firstName || 'Visitante',
  },

  actions: {
    async login(credentials: ILoginCredentials) {
      this.loading = true;
      this.error = null;
      
      try {
        const { user, token } = await AuthService.authenticate(credentials);

        this.user = user;
        this.token = token;

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        return true;
      } catch (err: any) {
        this.error = err.message || 'Erro ao realizar login';
        return false;
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      this.error = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }
});