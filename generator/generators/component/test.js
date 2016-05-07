const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
const { runGeneratorInApp } = require('../../testHelper')
require('chai').should()

const p = file => `app/components/component/${file}`


describe('component', () => {
  it('generates expected files', done => {
    helpers.run(__dirname)
      .withArguments(['component'])
      .on('end', () => {
        assert.file([
          'index.js',
          'template.jade',
          'style.sss',
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
          [p('index.js'), 'function ComponentController'],
          [p('index.js'), 'component(\'component\', '],
          [p('index.js'), '// replace <app-component />'],
        ])
        done()
      })
      .on('error', done)
  })
})
