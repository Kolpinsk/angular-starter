const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
const h = require('../../test-helper')
require('chai').should()


const defaults = {
  appName: 'app-name',
  appDesc: 'Your awesome app!',
  appKeywords: 'some, keywords',
  name: 'max',
  email: 'max@company.com',
  appLicense: 'BSD',
}


describe('app', () => {
  it('generates expected files', done => {
    helpers.run(__dirname)
      .withPrompts(defaults)
      .on('end', function () {
        const files = [
          '.babelrc',
          '.editorconfig',
          '.eslintrc.yml',
          '.gitignore',
          '.stylelintrc',
          'package.json',
          'README.md',
          'server.js',
          'webpack.conf.js',
          'app/components/',
          'app/directives/',
          'app/filters/',
          'app/helpers/',
          'app/helpers/constants.json',
          'app/helpers/index.js',
          'app/helpers/requireAll.js',
          'app/helpers/string.js',
          'app/services/',
          'app/app.js',
          'views/index.jade',
        ]
        assert.file(files)
        h.eslintCheck(this, files)
        done()
      })
    .on('error', done)
  })


  it('generates routes right', done => {
    helpers.run(__dirname)
      .withPrompts(defaults)
      .on('end', () => {
        assert.file('app/pages/routes.js')
        assert.fileContent('app/app.js', `\n  require('./pages/routes').default,\n`)
        done()
      })
    .on('error', done)
  })


  it('not generates routes if withRouting === false', done => {
    helpers.run(__dirname)
      .withPrompts(Object.assign(defaults, { withRouting: false }))
      .on('end', () => {
        assert.noFile('app/pages/routes.js')
        assert.noFileContent([
          ['app/app.js', 'require(\'./pages/routes\')'],
          ['package.json', 'angular-ui-router'],
          ['package.json', '\n    \n'],
          ['app/helpers/index.js', 'routes'],
        ])
        assert.fileContent('app/app.js', `\n  ...services,\n  //`)
        done()
      })
    .on('error', done)
  })


  it('generates README right', done => {
    helpers.run(__dirname)
      .withPrompts(defaults)
      .on('end', () => {
        assert.fileContent([
          ['README.md', '# app-name'],
          ['README.md', '> Your awesome app!'],
        ])
        done()
      })
    .on('error', done)
  })


  it('generates package.json right', done => {
    helpers.run(__dirname)
      .withPrompts(defaults)
      .on('end', () => {
        assert.jsonFileContent('package.json', {
          name: 'app-name',
          description: 'Your awesome app!',
          author: 'max <max@company.com>',
          keywords: 'some, keywords',
          license: 'BSD',
        })
        done()
      })
    .on('error', done)
  })
})
