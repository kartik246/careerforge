import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  server: {
    port: 3000,
    open: true
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'login.html'),
        jobs: resolve(__dirname, 'jobs.html'),
        prep: resolve(__dirname, 'prep.html'),
        companies: resolve(__dirname, 'companies.html'),
        dsa: resolve(__dirname, 'dsa.html'),
      },
    },
  },
});
