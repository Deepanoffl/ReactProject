import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in-bounce': 'fadeInBounce 1s ease-in-out',
      },
      keyframes: {
        fadeInBounce: {
          '0%': { opacity: 0, transform: 'translateY(-20px)' },
          '50%': { opacity: 0.5, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [react(),
    tailwindcss()
  ],
})
