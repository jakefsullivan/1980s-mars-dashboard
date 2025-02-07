import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Use global variables like 'describe', 'it', etc.
    environment: 'jsdom', // Provides a DOM environment for React components
    setupFiles: './src/test/setup.ts', // Optional: setup file to configure testing utilities
  },
});
