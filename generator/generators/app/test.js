// const path = require('path')
// const R = require('ramda')
const assert = require('yeoman-assert')
const helpers = require('yeoman-test')


const defaults = {
  appName: 'appName',
  githubUsername: 'username',
  website: 'test.com',
  moduleDesc: 'Your awesome app!',
}

it('generates expected files', done => {
  helpers.run(__dirname)
    .withPrompts(defaults)
    .on('end', () => {
      assert.file([
        '.babelrc',
        '.editorconfig',
        '.eslintrc.yml',
        '.gitignore',
        'package.json',
        'README.md',
        'server.js',
        'webpack.conf.js',
        'app/app.js',
        'app/helpers/constants.json',
        'app/helpers/index.js',
        'app/helpers/requireAll.js',
        'app/helpers/string.js',
      ])
      assert.fileContent('README.md', '# appName')
      // assert.fileContent('README.md', '[![Windows Build Status][appveyor-image]][appveyor-url]')
      done()
    })
  .on('error', done)
})
