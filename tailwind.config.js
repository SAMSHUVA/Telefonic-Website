/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        mono: ['Space Mono', 'monospace'],
      },
      colors: {
        'brand-slate': '#1e293b',
        'travel-slate': '#334155',
        'travel-graphite': '#475569',
        'travel-zinc': '#71717a',
        'travel-white': '#f8fafc',
        'travel-accent': '#e2e8f0',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'drift': 'drift 10s linear infinite',
        'bubble-rise': 'bubbleRise 4s ease-in infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        drift: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(20px)' },
        },
        bubbleRise: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateY(-20%)', opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}
