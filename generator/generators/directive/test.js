const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
require('chai').should()



describe('directive', () => {
  it('generates expected files', done => {
    helpers.run(__dirname)
      .withArguments(['autoFocus'])
      .on('end', () => {
        const file = 'app/directives/auto-focus.js'
        assert.file(file)
        assert.fileContent(file, 'directive(\'auto-focus\', ')
        done()
      })
    .on('error', done)
  })
})
