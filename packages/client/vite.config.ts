/* eslint-disable @typescript-eslint/naming-convention */

import react from '@vitejs/plugin-react';
import * as path from 'path';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import vitePluginImp from 'vite-plugin-imp';

// https://vitejs.dev/config/
export default defineConfig({
  server: { port: 8080 },
  plugins: [
    react(),
    vitePluginImp({
      libList: [],
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  define: { 'process.env': process.env },

  optimizeDeps: {
    include: ['tailwind.config.js'],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      'tailwind.config.js': path.resolve(__dirname, 'tailwind.config.js'),
    },
  },
});
