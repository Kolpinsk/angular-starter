const path = require('path')
const makeConfig = require('webpack-config-as')

module.exports = Object.assign(makeConfig(), {
  entry: './app/app.js',
  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'build'),
  },
})
