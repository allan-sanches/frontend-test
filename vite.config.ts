/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom', // Simula um navegador
    globals: true,        // Permite usar describe, it, expect sem importar
  },
})