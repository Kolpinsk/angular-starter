const path = require('path')
const helpers = require('yeoman-test')
const R = require('ramda')
require('colors')


exports.mockPrompts = {
  appName: 'app-name',
  appDesc: 'Your awesome app!',
  appKeywords: 'some, keywords',
  name: 'max',
  email: 'max@company.com',
}

exports.runGeneratorInApp = (pathToGenerator, { prompts } = {}) => {
  return helpers.run(pathToGenerator)
    .inTmpDir(function () { // eslint-disable-line
      const done = this.async()
      helpers
        .run(path.join(__dirname, 'generators/app'))
        .withPrompts(R.merge(exports.mockPrompts, prompts || {}))
        .on('end', done)
    })
}

exports.getConstants = self => {
  try {
    return require(self.destinationPath('app/helpers/constants.json'))
  } catch (err) {
    return {}
  }
}


// eslint

const isJsFile = file => /\.js$/.test(file)

const { CLIEngine } = require('eslint')
const eslintConfig = require('eslint-config-as')
const eslint = new CLIEngine(R.merge(eslintConfig, {
  useEslintrc: false,
  parser: 'babel-eslint',
}))

exports.eslintCheck = (context, files) => {
  if (!context || R.equals(context, {})) {
    throw new Error(
      'Wrong context. Check you pass `this` as first ' +
      'argument and parent function is not arrow function.'
    )
  }

  const cwd = context.env.cwd
  const getAbsolutePath = file => path.join(cwd, file)
  const formatMessage = msg =>
    `${msg.message} ${'|'.cyan} ${msg.source && msg.source.white}`

  const eslintReport = eslint.executeOnFiles(files.filter(isJsFile).map(getAbsolutePath))
  eslintReport.results.forEach(err => {
    const messages = err.messages.map(formatMessage).join('\n')
    if (messages) {
      throw new Error(messages, err.filePath)
    }
  })
}
