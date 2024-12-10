/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#003366',
          light: '#66B2FF',
        },
        secondary: {
          DEFAULT: '#2ECC71',
          light: '#A3D9A5',
        },
        neutral: {
          lightest: '#F5F5F5',
          DEFAULT: '#4D4D4D',
        },
        accent: {
          DEFAULT: '#FF5733',
          light: '#FFA07A',
        },
      },
    },
  },
  plugins: [],
};
