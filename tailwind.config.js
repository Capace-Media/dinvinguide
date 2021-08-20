module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        body: 'Montserrat',
        display: 'Playfair Display',
      },
      colors: {
        brand: {
          bg: '#EFE7DB',
          bronze: '#E3BB7D',
          red: '#A76D60',
          green: '#3A4F49',
          gray: '#444444',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
};
