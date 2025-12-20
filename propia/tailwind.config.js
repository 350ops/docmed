/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,ts,tsx}",
    "./components/**/*.{js,ts,tsx}",
    "./app/**/*.{js,ts,tsx}",
    "./global.css", // Include global.css
  ],
  theme: {
    extend: {
      fontFamily: {
        'outfit': ['Outfit_400Regular'],
        'outfit-bold': ['Outfit_700Bold'],
      },
      spacing: {
        global: '24px'
      },
      colors: {
        // DoctorConnect brand colors
        teal: {
          50: '#E6FAF6',
          100: '#B3F0E3',
          200: '#80E6D0',
          300: '#4DDBBC',
          400: '#1AD0A9',
          500: '#00C3A5', // Primary
          600: '#00A38A',
          700: '#008370',
          800: '#006255',
          900: '#00423A',
        },
        coral: {
          50: '#FFF1F0',
          100: '#FFD6D2',
          200: '#FFBAB4',
          300: '#FF9E96',
          400: '#FF8278',
          500: '#FF6B5B', // Accent
          600: '#E55A4A',
          700: '#CC4939',
          800: '#B23829',
          900: '#992718',
        },
        navy: {
          500: '#1a2b47',
          600: '#15223a',
          700: '#10192c',
        },
        // Light theme colors
        highlight: '#00C3A5', // Teal instead of red
        light: {
          primary: '#ffffff', // White
          secondary: '#F5F5F5', // Light gray
          text: '#000000', // Black
          subtext: '#64748B'
        },
        // Dark theme colors
        dark: {
          primary: '#171717', // Black
          secondary: '#262626',
          darker: '#000000',
          text: '#ffffff', // White
          subtext: '#A1A1A1'
        },
      },
    },
  },
  plugins: [],
};