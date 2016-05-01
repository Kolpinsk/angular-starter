const express = require('express')
const webpack = require('webpack')
const ora = require('ora')
require('colors')

const webpackConfig = require('./webpack.conf')
webpackConfig.entry = [
  'webpack-hot-middleware/client?reload=true',
].concat(webpackConfig.entry)
const compiler = webpack(webpackConfig)

const app = express()


const oraReporter = () => {
  const spinner = ora()
  spinner.start()
  return ({ state, stats }) => {
    if (state) {
      const durations = stats.endTime - stats.startTime
      const formatedDurations = durations >= 1000 ? `${durations / 1000} s` : `${durations} ms`
      const message = `Completed in ${formatedDurations.magenta}`

      if (stats.hasErrors() || stats.hasWarnings()) {
        spinner.clear()
        const { errors, warnings } = stats.compilation
        errors.concat(warnings).forEach(warning => {
          if (warning.message) {
            console.log(warning.message) // eslint-disable-line no-console
          }
        })
      }

      spinner.text = message
    } else {
      spinner.text = 'Building...'
    }
  }
}


app.use(require('webpack-dev-middleware')(compiler, {
  reporter: oraReporter(),
  inline: true,
}))
app.use(require('webpack-hot-middleware')(compiler, { log: () => 1 }))
app.use(express.static('build/'))

app.listen(3000)
