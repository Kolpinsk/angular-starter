// Disable global-require to do not create variables plugins
/* eslint-disable global-require */

module.exports = {
  presets: [
    require('babel-preset-es2015'),
  ],
  plugins: [
    require('babel-plugin-transform-object-rest-spread'),
    require('babel-plugin-lodash').default,
    require('babel-plugin-ramda').default,
  ],
}
