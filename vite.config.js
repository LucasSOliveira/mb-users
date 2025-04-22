import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  root: 'src/views',
  base: '/',
  plugins: [vue()],
  resolve: { 
    alias: { 
      '@': path.resolve(__dirname, 'src'),
      '@views': path.resolve(__dirname, 'src/views'),
      '@validators': path.resolve(__dirname, 'src/validators'),
      '@components': path.resolve(__dirname, 'src/views/components'),
      "@modules": path.resolve(__dirname, 'src/views/modules/'),
      '@assets': path.resolve(__dirname, 'src/views/assets'),
    } 
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
    manifest: true,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash][extname]',
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
      },
      input: {
        main: path.resolve(__dirname, 'src/views/index.html'),
        registration: path.resolve(__dirname, 'src/views/modules/registration/instance.js')
      }
    }
  },
  server: {
    middlewareMode: true,
    port: 5173
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@assets/styles/variables/_colors.variables.scss" as *;
          @use "@assets/styles/variables/_typography.variables.scss" as *;
          @use "@assets/styles/variables/_ui.variables.scss" as *;
        `
      }
    }
  }
});
