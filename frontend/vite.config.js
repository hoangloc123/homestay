import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve:
  {
    alias: {
      '@components': path.resolve(__dirname, 'src/components/'),
      '@assets': path.resolve(__dirname, 'src/assets/'),
      '@pages': path.resolve(__dirname, 'src/pages/'),
      '@layout': path.resolve(__dirname, 'src/layout/'),
      '@router': path.resolve(__dirname, 'src/router/'),
      '@utils': path.resolve(__dirname, 'src/utils/'),
    }
  }
});
