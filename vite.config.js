import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base:'/react-quiz-maker/',
  resolve: {
    alias: {
      '@views': path.resolve(__dirname, './src/views'),
      '@service': path.resolve(__dirname, './src/service')
    },
  },
});
