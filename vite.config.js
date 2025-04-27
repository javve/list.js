import { defineConfig } from 'vite'
import terser from '@rollup/plugin-terser'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'List',
      formats: ['umd', 'esm', 'cjs'],
      fileName: (format) => (format === 'umd' ? 'list.js' : `list.${format}.js`),
    },
    sourcemap: true,
    rollupOptions: {
      output: {
        plugins: [
          terser({
            format: {
              comments: /^! List.js v.*/,
            },
            mangle: true,
          }),
        ],
      },
    },
  },
})
