/** @type {import('tailwindcss').Config} */
import corpguardConfig from './src/components/corpguard-design-tokens/corpguard-design-tokens/tailwind.config.js';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      ...corpguardConfig.theme.extend,
    },
  },
  plugins: [],
}
