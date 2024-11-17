/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#f97316', // Orange 500
          dark: '#ea580c',    // Orange 600
        },
        background: {
          DEFAULT: '#1a1a1a',
          light: '#262626',
        },
        text: {
          DEFAULT: '#f3f4f6', // Gray 100
          muted: '#9ca3af',   // Gray 400
        }
      },
      padding: {
        'safe': 'env(safe-area-inset-bottom, 0px)',
        'safe-top': 'env(safe-area-inset-top, 0px)'
      }
    },
  },
  plugins: [],
}

