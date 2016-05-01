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
  spinner.pause = () => {
    spinner.stop()
    const frames = spinner.spinner.frames
    const index = spinner.frameIndex
    const oldFrame = frames[index]
    frames[index] = '⠿'
    spinner.render()
    frames[index] = oldFrame
  }

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
            console.log(warning.message)
          }
        })
      }

      spinner.text = message
      spinner.pause()
    } else {
      spinner.start()
      spinner.text = 'Building...'
    }
  }
}


app.use(require('webpack-dev-middleware')(compiler, {
  reporter: oraReporter(),
}))
app.use(require('webpack-hot-middleware')(compiler, { log: () => 1 }))
app.use(express.static('build/'))

app.listen(3000)
