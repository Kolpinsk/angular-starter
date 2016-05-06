const path = require('path')
// const R = require('ramda')
const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
require('chai').should()


const defaults = {
  appName: 'appName',
  appDesc: 'Your awesome app!',
  appKeywords: 'some, keywords',
}

it('generates expected files', done => {
  helpers.run(__dirname)
    .withPrompts(defaults)
    .on('end', function () {
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
      assert.fileContent('README.md', `# ${defaults.appName}`)
      assert.fileContent('README.md', `> ${defaults.appDesc}`)
      const packageJson = require(path.join(this.env.cwd, 'package.json'))
      packageJson.name.should.be.equal('appName')
      packageJson.description.should.be.equal(defaults.appDesc)
      done()
    })
  .on('error', done)
})
