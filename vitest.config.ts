import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './__tests__/setup.ts',
    // Vitest's default `include` matches **/*.{test,spec}.* anywhere, which
    // would scoop up the Playwright suites in e2e/ and fail at collection
    // time. Keep unit tests under __tests__/ and route e2e through playwright.
    include: ['__tests__/**/*.{test,spec}.{ts,tsx}'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
