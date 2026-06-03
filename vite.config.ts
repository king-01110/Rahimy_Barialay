import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// Must match the GitHub repo name: github.io/<repo>/
const base = '/Rahimy_Barialay/'

export default defineConfig({
  base,
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        cleanupOutdatedCaches: true,
      },
      manifest: {
        name: 'Barialay Rahimi Portfolio',
        short_name: 'Barialay Portfolio',
        theme_color: '#0F172A',
        background_color: '#0F172A',
        display: 'standalone',
        icons: [
          {
            src: `${base}icons.svg`,
            sizes: '192x192',
            type: 'image/svg+xml',
          },
          {
            src: `${base}icons.svg`,
            sizes: '512x512',
            type: 'image/svg+xml',
          },
        ],
      },
    }),
  ],
})
