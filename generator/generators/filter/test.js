const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
require('chai').should()



describe('filter', () => {
  it('generates expected files', done => {
    helpers.run(__dirname)
      .withArguments(['emoji'])
      .on('end', () => {
        const file = 'app/filters/emoji.js'
        assert.file(file)
        assert.fileContent(file, 'filter(\'emoji\', ')
        done()
      })
    .on('error', done)
  })
})
