const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
const h = require('../../test-helper')
require('chai').should()



describe('service', () => {
  it('generates expected files', done => {
    helpers.run(__dirname)
      .withArguments(['name'])
      .on('end', function () {
        const file = 'app/services/Name.js'
        assert.file(file)
        assert.fileContent(file, 'factory(\'NameService\', ')
        h.eslintCheck(this, [file])
        done()
      })
    .on('error', done)
  })
})
