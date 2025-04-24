import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom', // <-- detta är det viktiga!
    globals: true,
  },
})
