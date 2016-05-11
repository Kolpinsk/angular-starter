const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
require('chai').should()



describe('service', () => {
  it('generates expected files', done => {
    helpers.run(__dirname)
      .withArguments(['name'])
      .on('end', () => {
        const file = 'app/services/Name.js'
        assert.file(file)
        assert.fileContent(file, 'factory(\'NameService\', ')
        done()
      })
    .on('error', done)
  })
})
