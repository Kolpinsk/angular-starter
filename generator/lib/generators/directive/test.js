const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
const h = require('../../test-helper')
require('chai').should()



describe('directive', () => {
  it('generates expected files', done => {
    helpers.run(__dirname)
      .withArguments(['autoFocus'])
      .on('end', function () {
        const file = 'app/directives/auto-focus.js'
        assert.file(file)
        h.eslintCheck(this, [file])
        assert.fileContent(file, 'directive(\'auto-focus\', ')
        done()
      })
    .on('error', done)
  })
})
