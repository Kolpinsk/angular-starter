const express = require('express')
const webpack = require('webpack')
const { findAPortNotInUse } = require('portscanner')
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

findAPortNotInUse(3000, 3010, 'localhost', (err, port) => {
  if (err) console.error(err)
  if (!port) console.error('Port not found')
  app.server = app.listen(port, error => {
    if (error) console.error(error)
    console.log(`http://localhost:${port}`)
  })
})

exports.app = app
