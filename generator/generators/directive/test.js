const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
require('chai').should()



describe('directive', () => {
  it('generates expected files', done => {
    helpers.run(__dirname)
      .withArguments(['autofocus'])
      .on('end', () => {
        const file = 'app/directives/autofocus.js'
        assert.file(file)
        assert.fileContent(file, 'directive(\'autofocus\', ')
        done()
      })
    .on('error', done)
  })
})
