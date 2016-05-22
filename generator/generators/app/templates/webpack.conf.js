const path = require('path')
const configAs = require('webpack-config-as')

const profile = process.env.NODE_ENV === 'development' ? 'dev' : 'prod'
const config = configAs.extend({
  entry: './app/app.js',
  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'build'),
  },
}, { profile })

module.exports = config
