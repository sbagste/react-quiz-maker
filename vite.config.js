import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base:'/react-quiz-maker/',
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@reducers': path.resolve(__dirname, './src/reducers'),
      '@services': path.resolve(__dirname, './src/services'),
      '@views': path.resolve(__dirname, './src/views')
    },
  },
});
