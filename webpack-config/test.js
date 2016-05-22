require('chai').should()
const { transformers } = require('./')

describe('postcss transformer', () => {
  it('should be a function', () => {
    transformers.postcss({ postcss: {} }).postcss.should.be.a('function')
  })

  it('should tranform plugins', () => {
    transformers.postcss({
      postcss: {
        plugins: {
          cssnext: 'postcss-cssnext',
        },
        parser: 'sugarss',
      },
    }).postcss().should.be.deep.equal({
      plugins: ['postcss-cssnext'],
      parser: 'sugarss',
    })
  })

  // Order is saved if all keys not numbers or numbers as string
  // More info (Russian):
  // https://learn.javascript.ru/object-for-in#в-каком-порядке-перебираются-свойства
  it('should keep plugins order', () => {
    transformers.postcss({
      postcss: {
        plugins: {
          precss: 'precss',
          cssnext: 'postcss-cssnext',
          b: 'b',
          a: 'a',
        },
      },
    }).postcss().should.be.deep.equal({
      plugins: ['precss', 'postcss-cssnext', 'b', 'a'],
    })
  })
})

describe('posthtml transformer', () => {
  it('should be a function', () => {
    transformers.posthtml({
      posthtml: {
        plugins: {
          bem: 'bem',
        },
      },
    }).posthtml.should.be.a('function')
  })

  it('should tranform posthtml options', () => {
    transformers.posthtml({
      posthtml: {
        plugins: {
          bem: 'bem',
        },
      },
    }).posthtml().should.be.deep.equal({
      plugins: ['bem'],
    })
  })
})
