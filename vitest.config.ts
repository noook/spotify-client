import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    passWithNoTests: true,
    include: ['tests/**/*.spec.ts'],
    coverage: {
      include: ['src/**/*.ts'],
      reporter: ['text', 'json', 'html'],
      exclude: ['src/**/*.spec.ts', 'src/index.ts'],
    },
  },
})
