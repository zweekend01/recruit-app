module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {},
    cssnano: {},
    autoprefixer: {
      overrideBrowsers: [
        '>1%',
        'last 4 versions',
        'Firefox ESR',
        'not ie < 9' // React doesn't support IE8 anyway
      ],
      flexbox: 'no-2009'
    },
    'postcss-flexbugs-fixes': {}
  }
}
