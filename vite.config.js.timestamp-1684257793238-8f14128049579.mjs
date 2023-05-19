// vite.config.js
import { defineConfig } from "file:///C:/Users/tharu/OneDrive/Documents/GitHub/MusiConn/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/tharu/OneDrive/Documents/GitHub/MusiConn/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { VitePWA } from "file:///C:/Users/tharu/OneDrive/Documents/GitHub/MusiConn/node_modules/vite-plugin-pwa/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
      injectRegister: "auto",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"]
      },
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
      manifest: {
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
        "start_url": "/",
        "theme_color": "#ffffff",
        "background_color": "#ffffff",
        "display": "standalone",
        "lang": "en",
        "scope": "/"
      }
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx0aGFydVxcXFxPbmVEcml2ZVxcXFxEb2N1bWVudHNcXFxcR2l0SHViXFxcXE11c2lDb25uXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx0aGFydVxcXFxPbmVEcml2ZVxcXFxEb2N1bWVudHNcXFxcR2l0SHViXFxcXE11c2lDb25uXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy90aGFydS9PbmVEcml2ZS9Eb2N1bWVudHMvR2l0SHViL011c2lDb25uL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xyXG5pbXBvcnQgeyBWaXRlUFdBIH0gZnJvbSAndml0ZS1wbHVnaW4tcHdhJ1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbcmVhY3QoKSxcclxuICAgIFZpdGVQV0Eoe1xyXG4gICAgICByZWdpc3RlclR5cGU6IFwicHJvbXB0XCIsXHJcbiAgICAgIGluamVjdFJlZ2lzdGVyOiAnYXV0bycsXHJcbiAgICAgIHdvcmtib3g6IHtcclxuICAgICAgICBnbG9iUGF0dGVybnM6IFsnKiovKi57anMsY3NzLGh0bWwsaWNvLHBuZyxzdmd9J11cclxuICAgICAgfSxcclxuICAgICAgaW5jbHVkZUFzc2V0czogWydmYXZpY29uLmljbycsICdhcHBsZS10b3VjaC1pY29uLnBuZycsICdtYXNrZWQtaWNvbi5zdmcnXSxcclxuICAgICAgbWFuaWZlc3Q6e1xyXG4gICAgICAgIFwibmFtZVwiOiBcIm11c2ljb25uXCIsXHJcbiAgICAgICAgXCJzaG9ydF9uYW1lXCI6IFwibXVzaWNvbm5cIixcclxuICAgICAgICBcImljb25zXCI6IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgXCJzcmNcIjogXCIvYW5kcm9pZC1jaHJvbWUtMTkyeDE5Mi5wbmdcIixcclxuICAgICAgICAgICAgXCJzaXplc1wiOiBcIjE5MngxOTJcIixcclxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2UvcG5nXCIsXHJcbiAgICAgICAgICAgIFwicHVycG9zZVwiOiBcIm1vbm9jaHJvbWVcIlxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgXCJzcmNcIjogXCIvYW5kcm9pZC1jaHJvbWUtNTEyeDUxMi5wbmdcIixcclxuICAgICAgICAgICAgXCJzaXplc1wiOiBcIjUxMng1MTJcIixcclxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2UvcG5nXCIsXHJcbiAgICAgICAgICAgIFwicHVycG9zZVwiOiBcImFueVwiXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBcInNyY1wiOiBcIi9hcHBsZS10b3VjaC1pY29uLnBuZ1wiLFxyXG4gICAgICAgICAgICBcInNpemVzXCI6IFwiMTgweDE4MFwiLFxyXG4gICAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZS9wbmdcIixcclxuICAgICAgICAgICAgXCJwdXJwb3NlXCI6IFwiYW55XCJcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIFwic3JjXCI6IFwiL21hc2thYmxlX2ljb24ucG5nXCIsXHJcbiAgICAgICAgICAgIFwic2l6ZXNcIjogXCIyMjV4MjI1XCIsXHJcbiAgICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlL3BuZ1wiLFxyXG4gICAgICAgICAgICBcInB1cnBvc2VcIjogXCJtYXNrYWJsZVwiXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgXSxcclxuICAgICAgICBcInN0YXJ0X3VybFwiOlwiL1wiLFxyXG4gICAgICAgIFwidGhlbWVfY29sb3JcIjogXCIjZmZmZmZmXCIsXHJcbiAgICAgICAgXCJiYWNrZ3JvdW5kX2NvbG9yXCI6IFwiI2ZmZmZmZlwiLFxyXG4gICAgICAgIFwiZGlzcGxheVwiOiBcInN0YW5kYWxvbmVcIixcclxuICAgICAgICBcImxhbmdcIjpcImVuXCIsXHJcbiAgICAgICAgXCJzY29wZVwiOlwiL1wiXHJcbiAgICAgIH0gXHJcbiAgICB9KVxyXG4gIF0sXHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBbVYsU0FBUyxvQkFBb0I7QUFDaFgsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsZUFBZTtBQUd4QixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFBQyxNQUFNO0FBQUEsSUFDZCxRQUFRO0FBQUEsTUFDTixjQUFjO0FBQUEsTUFDZCxnQkFBZ0I7QUFBQSxNQUNoQixTQUFTO0FBQUEsUUFDUCxjQUFjLENBQUMsZ0NBQWdDO0FBQUEsTUFDakQ7QUFBQSxNQUNBLGVBQWUsQ0FBQyxlQUFlLHdCQUF3QixpQkFBaUI7QUFBQSxNQUN4RSxVQUFTO0FBQUEsUUFDUCxRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsUUFDZCxTQUFTO0FBQUEsVUFDUDtBQUFBLFlBQ0UsT0FBTztBQUFBLFlBQ1AsU0FBUztBQUFBLFlBQ1QsUUFBUTtBQUFBLFlBQ1IsV0FBVztBQUFBLFVBQ2I7QUFBQSxVQUNBO0FBQUEsWUFDRSxPQUFPO0FBQUEsWUFDUCxTQUFTO0FBQUEsWUFDVCxRQUFRO0FBQUEsWUFDUixXQUFXO0FBQUEsVUFDYjtBQUFBLFVBQ0E7QUFBQSxZQUNFLE9BQU87QUFBQSxZQUNQLFNBQVM7QUFBQSxZQUNULFFBQVE7QUFBQSxZQUNSLFdBQVc7QUFBQSxVQUNiO0FBQUEsVUFDQTtBQUFBLFlBQ0UsT0FBTztBQUFBLFlBQ1AsU0FBUztBQUFBLFlBQ1QsUUFBUTtBQUFBLFlBQ1IsV0FBVztBQUFBLFVBQ2I7QUFBQSxRQUNGO0FBQUEsUUFDQSxhQUFZO0FBQUEsUUFDWixlQUFlO0FBQUEsUUFDZixvQkFBb0I7QUFBQSxRQUNwQixXQUFXO0FBQUEsUUFDWCxRQUFPO0FBQUEsUUFDUCxTQUFRO0FBQUEsTUFDVjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
