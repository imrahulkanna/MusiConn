import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    VitePWA({
      registerType: "prompt",
      injectRegister: 'auto',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest:{
        "name": "musiconn",
        "short_name": "musiconn",
        "icons": [
          {
            "src": "/android-chrome-192x192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "monochrome"
          },
          {
            "src": "/android-chrome-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "/apple-touch-icon.png",
            "sizes": "180x180",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "/maskable_icon.png",
            "sizes": "225x225",
            "type": "image/png",
            "purpose": "maskable"
          }
        ],
        "start_url":"/",
        "theme_color": "#ffffff",
        "background_color": "#ffffff",
        "display": "standalone",
        "lang":"en",
        "scope":"/"
      } 
    })
  ],
})
