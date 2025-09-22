import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // asosiy react kutubxonalar
          react: ['react', 'react-dom'],

          // routing
          router: ['react-router-dom'],

          // redux state management
          redux: ['@reduxjs/toolkit', 'react-redux'],

          // material ui alohida
          mui: ['@mui/material', '@mui/icons-material', '@mui/x-date-pickers'],

          // charts
          charts: ['chart.js', 'react-chartjs-2'],

          // maps
          maps: ['leaflet', 'react-leaflet'],

          // rich text editor
          editor: ['quill'],

          // i18n tarjima
          i18n: ['i18next', 'react-i18next'],

          // real-time va socketlar
          realtime: ['socket.io-client', 'pusher-js'],
        },
      },
    },
  },
})
