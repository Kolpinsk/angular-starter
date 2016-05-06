/* eslint-disable func-names */

const path = require('path')
// const R = require('ramda')
const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
require('chai').should()


const defaults = {
  appName: 'app-name',
  appDesc: 'Your awesome app!',
  appKeywords: 'some, keywords',
  name: 'max',
  email: 'max@company.com',
  appLicense: 'BSD',
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
      done()
    })
  .on('error', done)
})


it('generates README right', done => {
  helpers.run(__dirname)
    .withPrompts(defaults)
    .on('end', () => {
      assert.fileContent('README.md', '# app-name')
      assert.fileContent('README.md', '> Your awesome app!')

      done()
    })
  .on('error', done)
})


it('generates package.json right', done => {
  helpers.run(__dirname)
    .withPrompts(defaults)
    .on('end', function () {
      const packageJson = require(path.join(this.env.cwd, 'package.json'))
      packageJson.name.should.be.equal('app-name')
      packageJson.description.should.be.equal('Your awesome app!')
      packageJson.author.should.be.equal('max <max@company.com>')
      packageJson.keywords.should.be.deep.equal('some, keywords')
      packageJson.license.should.be.equal('BSD')

      done()
    })
  .on('error', done)
})
