import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api-backend': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api-backend/, ''),
      },
    
      '/users': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
