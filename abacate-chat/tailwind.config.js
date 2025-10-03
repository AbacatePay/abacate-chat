
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/app/**/*.{js,ts,jsx,tsx}',
      './src/pages/**/*.{js,ts,jsx,tsx}',
      './src/components/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: 'class', 
    theme: {
      extend: {
        colors: {
          'gray-light': 'var(--color-gray-light)',
          'gray-border': 'var(--color-gray-border)',
          'gray-text': 'var(--color-gray-text)',
        },
      },
    },
    plugins: [],
  }
  