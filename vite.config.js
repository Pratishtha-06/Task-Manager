import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "./", // Ensures correct asset paths
  build: {
    outDir: "dist"  // Ensures Vercel deploys from 'dist' folder
  }
  ,
  resolve: {
    alias: {
      '@': '/src' // Ensures correct path resolution
    }
  },
  eslint:{
   ignoreDuringBuilds:true,
  },
})
