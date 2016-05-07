const path = require('path')
const helpers = require('yeoman-test')
const R = require('ramda')

exports.mockPrompts = {
  appName: 'app-name',
  appDesc: 'Your awesome app!',
  appKeywords: 'some, keywords',
  name: 'max',
  email: 'max@company.com',
}

exports.runGeneratorInApp = (pathToGenerator, { prompts }) => {
  return helpers.run(pathToGenerator)
    .inTmpDir(function () { // eslint-disable-line
      const done = this.async()
      helpers
        .run(path.join(__dirname, 'generators/app'))
        .withPrompts(R.merge(exports.mockPrompts, prompts || {}))
        .on('end', done)
    })
}
