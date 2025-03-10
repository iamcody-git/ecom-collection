import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5174, // Your frontend port
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Your backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
