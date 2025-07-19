/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  darkMode: ['selector', '.dark'],
  theme: {
    extend: {
      fontFamily: {
        barriecito: ["'Barriecito'", 'system-ui', 'sans-serif'],
      },
    },
  },
}

export default config
