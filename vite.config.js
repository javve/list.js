import { defineConfig } from 'vite'
import terser from '@rollup/plugin-terser'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'List',
      fileName: (format) => (format === 'umd' ? 'list.js' : 'list.min.js'),
      formats: ['umd'],
    },
    sourcemap: true,
    rollupOptions: {
      output: {
        entryFileNames: (chunkInfo) => (chunkInfo.name === 'list' ? 'list.js' : 'list.min.js'),
        plugins: [
          terser({
            format: {
              comments: /^! List.js v.*/,
            },
            include: [/\.min\.js$/],
            mangle: true,
          }),
        ],
      },
    },
  },
})
