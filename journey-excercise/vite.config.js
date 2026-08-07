import { defineConfig } from 'vite';
import path from 'path';
import glsl from 'vite-plugin-glsl';

export default defineConfig({
  // root: path.resolve(__dirname, 'src'), // 关键配置
  root: './src/',
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    sourcemap: true,
  },
  plugins: [
    glsl()
  ]
})
