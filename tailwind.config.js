module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        Inter: ['Inter', 'sans-serif'] 
      },
      colors: {
        brand: {
          300: '#996dff',
          500: '#8257e6',
        }
      },
    },
  },
  plugins: [],
}
