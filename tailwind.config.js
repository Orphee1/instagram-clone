module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'

  theme: {
    fill: (theme) => ({
      red: theme('colors.red.primary '),
    }),
    colors: {
      white: '#fff',
      blue: {
        medium: '#005c98',
      },
      black: {
        light: '#262626',
        faded: '#0000059',
      },
      gray: { base: '#616161', background: '#fafafa', primary: '#dbdbdb' },
      red: { primary: '#ed4956' },
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
