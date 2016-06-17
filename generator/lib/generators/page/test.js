const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
const h = require('../../test-helper')
require('chai').should()

const p = file => `app/pages/${file}`


describe('page', () => {
  it('generates expected files', done => {
    helpers.run(__dirname)
      .withArguments(['page'])
      .on('end', () => {
        assert.file([
          'page/index.js',
          'page/template.jade',
          'page/style.sss',
        ].map(p))
        done()
      })
    .on('error', done)
  })


  it('generates index.js right', done => {
    h.runGeneratorInApp(__dirname)
      .withArguments(['page'])
      .on('end', () => {
        assert.fileContent([
          [p('page/index.js'), 'function PageController'],
          [p('page/index.js'), 'route(\'page\', '],
        ])
        done()
      })
      .on('error', done)
  })


  it('generates template.jade right', done => {
    h.runGeneratorInApp(__dirname)
      .withArguments(['pageName'])
      .on('end', () => {
        assert.fileContent([
          [p('pageName/template.jade'), '.page-name\n  | pageName'],
        ])
        done()
      })
      .on('error', done)
  })


  it('generates styles.sss right', done => {
    h.runGeneratorInApp(__dirname)
      .withArguments(['pageName'])
      .on('end', () => {
        assert.fileContent([
          [p('pageName/style.sss'), '.page-name'],
        ])
        done()
      })
      .on('error', done)
  })
})
