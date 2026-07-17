/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        garamond: ['Garamond', 'Times New Roman', 'serif'],
        geist: ['Geist', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        ink: '#010101',
        ember: '#e8a34a',
        'ember-deep': '#b87a1e',
      },
    },
  },
  plugins: [],
}
