/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B00',
        secondary: '#2196F3',
        accent: '#FF9800',
        danger: '#F44336',
        success: '#4CAF50',
        warning: '#FFC107',
        info: '#00BCD4',
        light: '#F5F5F5',
        dark: '#212121',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}