const express = require('express')
const webpack = require('webpack')
const ora = require('ora')
const constants = require('./app/helpers/constants.json')
require('colors')

const webpackConfig = require('./webpack.conf')
webpackConfig.entry = [
  'webpack-hot-middleware/client?reload=true',
].concat(webpackConfig.entry)
const compiler = webpack(webpackConfig)

const app = express()

app.use(require('webpack-dev-middleware')(compiler, {
  reporter: require('webpack-dots-reporter')(),
}))
app.use(require('webpack-hot-middleware')(compiler, { log: () => 1 }))
app.use(express.static('build/', { index: false }))
app.get('*', (req, res) => res.render('index.jade', constants))

app.listen(3000)
