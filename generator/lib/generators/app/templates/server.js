const path = require('path')
const express = require('express')
const webpack = require('webpack')
const constants = require('./app/helpers/constants.json')
const { findAPortNotInUse } = require('portscanner')
const styleguide = require('styleguide-as')


// init app
const app = express()
app.set('view engine', 'jade')


// compile static through webpack middlewares
const webpackConfig = require('./webpack.conf')
webpackConfig.entry = [
  'webpack-hot-middleware/client?reload=true',
].concat(webpackConfig.entry)
const compiler = webpack(webpackConfig)

app.use(require('webpack-dev-middleware')(compiler, {
  reporter: require('webpack-dots-reporter')(),
}))
app.use(require('webpack-hot-middleware')(compiler, { log: () => 1 }))



app.use('/styleguide', styleguide({
  componentsDir: path.join(__dirname, './app/components'),
  constants,
}))

app.get('*', (req, res) => res.render('index', { constants }))

findAPortNotInUse(3000, 3010, 'localhost', (err, port) => {
  if (err) console.error(err)
  if (!port) console.error('Port not found')
  app.server = app.listen(port, error => {
    if (error) console.error(error)
    console.log(`http://localhost:${port}`)
  })
})
