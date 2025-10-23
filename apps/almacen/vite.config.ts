import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      //TODO: Revisar si es necesario
      '@workspace/ui': path.resolve(__dirname, '../../packages/ui/src'),
      '@workspace/supabase': path.resolve(__dirname, '../../packages/supabase/src'),
      '@workspace/api-presupuestos': path.resolve(__dirname, '../../packages/api-presupuestos/src'),
    },
  },
})
