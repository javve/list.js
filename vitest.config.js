import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom', // <-- detta är det viktiga!
    globals: true,
    coverage: {
      reporter: ['text', 'lcov', 'html'],
      reportsDirectory: './coverage',
      exclude: ['node_modules', 'dist', '**/*.test.*'],
    },
  },
})
