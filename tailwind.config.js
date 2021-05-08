module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  future: { removeDeprecatedGapUtilities: true },
  theme: {
    fill: (theme) => ({ red: theme('colors.red.primary') }),
    colors: {
      white: '#ffff',
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
    // extend: {},
    display: ['group-hover'],
  },
  plugins: [],
};
