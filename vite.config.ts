import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'  // или   @vitejs/plugin-react

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    modules: {
      // Конфигурация CSS модулей
      localsConvention: 'camelCase',
      // каmelCase для названий классов (movieCard вместо movie-card)
    },
  },
})