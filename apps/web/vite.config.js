import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Load VITE_* variables from the monorepo root .env
  envDir: '../..',
  server: {
    port: 5173,
  },
});
