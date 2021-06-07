module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{html,ts}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
        'world-splash': "url('./assets/img/holochain_ring.jpeg')",
       })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
