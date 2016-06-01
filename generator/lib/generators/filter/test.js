const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
const h = require('../../testHelper')
require('chai').should()


describe('filter', () => {
  it('generates expected files', done => {
    helpers.run(__dirname)
      .withArguments(['emoji'])
      .on('end', function () {
        const file = 'app/filters/emoji.js'
        h.eslintCheck(this, [file])
        assert.file(file)
        assert.fileContent(file, 'filter(\'emoji\', ')
        done()
      })
    .on('error', done)
  })
})
