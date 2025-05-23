import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Alias '@' points to the 'src' directory
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'], // Ensures 'lucide-react' is not pre-bundled
  },
});
