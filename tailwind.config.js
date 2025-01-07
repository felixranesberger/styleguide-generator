/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // './client/**/*.{js,ts,jsx,tsx,css}',
    './lib/**/*.{js,ts,jsx,tsx,css}',
  ],
  theme: {
    extend: {
      colors: {
        'styleguide': 'var(--styleguide-color-regular)',
        'styleguide-highlight': 'var(--styleguide-color-highlight)',
        'styleguide-bg': 'var(--styleguide-color-background)',
        'styleguide-bg-highlight': 'var(--styleguide-color-background-highlight)',
        'styleguide-border': 'var(--styleguide-color-border)',
      },
      fontFamily: {
        sans: ['Geist Sans'],
        mono: ['Geist Mono'],
      },
    },
  },
  plugins: [],
  darkMode: ['class', '.theme-dark'],
}
