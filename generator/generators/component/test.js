const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
const { runGeneratorInApp } = require('../../testHelper')
require('chai').should()

const p = file => `app/components/${file}`


describe('component', () => {
  it('generates expected files', done => {
    helpers.run(__dirname)
      .withArguments(['component'])
      .on('end', () => {
        assert.file([
          'component/index.js',
          'component/template.jade',
          'component/style.sss',
          'component/README.md',
        ].map(p))
        done()
      })
    .on('error', done)
  })


  it('generates index.js right', done => {
    runGeneratorInApp(__dirname, { prompts: { prefix: 'app' } })
      .withArguments(['component'])
      .on('end', () => {
        assert.fileContent([
          [p('component/index.js'), 'function ComponentController'],
          [p('component/index.js'), 'component(\'component\', '],
        ])
        done()
      })
      .on('error', done)
  })


  it('generates README.md right', done => {
    runGeneratorInApp(__dirname, { prompts: { prefix: 'app' } })
      .withArguments(['component'])
      .on('end', () => {
        assert.fileContent([
          [p('component/README.md'), '<app-component />'],
        ])
        done()
      })
      .on('error', done)
  })


  it('generates template.jade right', done => {
    runGeneratorInApp(__dirname, { prompts: { prefix: 'app' } })
      .withArguments(['componentName'])
      .on('end', () => {
        assert.fileContent([
          [p('component-name/template.jade'), '.component-name\n  | component-name'],
        ])
        done()
      })
      .on('error', done)
  })


  it('generates styles.sss right', done => {
    runGeneratorInApp(__dirname, { prompts: { prefix: 'app' } })
      .withArguments(['componentName'])
      .on('end', () => {
        assert.fileContent([
          [p('component-name/style.sss'), '.component-name'],
        ])
        done()
      })
      .on('error', done)
  })
})
