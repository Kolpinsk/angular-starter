const path = require('path')
const express = require('express')
const request = require('supertest')
const styleguideMiddleware = require('../')
const constants = require('./constants.json')
require('chai').should()



describe('GET /styleguide', function () {
  beforeEach(() => {
    this.app = express()
    this.app.use('/styleguide', styleguideMiddleware({
      componentsDir: path.join(__dirname, '../fixtures/app/components'),
      constants,
    }))
    this.server = this.app.listen(6918) // random free port
  })

  afterEach(() => {
    // if server already run
    if (this.server) {
      this.server.close()
    }
  })

  it('respond success', done => {
    request(this.app)
      .get('/styleguide/')
      .expect(res => {
        res.text.should.include('button')
      })
      .expect(200, done)
  })

  it('get 200 for existing component', done => {
    request(this.app)
      .get('/styleguide/button')
      .expect(res => {
        res.text.should.include('button')
      })
      .expect(200, done)
  })

  it('get 404 if no component with that name', done => {
    request(this.app)
      .get('/styleguide/nonexistent_component_with_long_name')
      .expect(res => {
        res.text.should.include('not found')
      })
      .expect(404, done)
  })
})
