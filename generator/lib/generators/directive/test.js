const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
const { eslintCheck } = require('../../testHelper')
require('chai').should()



describe('directive', () => {
  it('generates expected files', done => {
    helpers.run(__dirname)
      .withArguments(['autoFocus'])
      .on('end', function () {
        const file = 'app/directives/auto-focus.js'
        assert.file(file)
        eslintCheck(this, [file])
        assert.fileContent(file, 'directive(\'auto-focus\', ')
        done()
      })
    .on('error', done)
  })
})
