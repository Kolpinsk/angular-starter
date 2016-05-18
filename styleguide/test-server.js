const path = require('path')
const express = require('express')
const styleguideMiddleware = require('./')
const constants = require('./constants.json')

const app = express()
app.use('/styleguide', styleguideMiddleware({
  componentsDir: path.join(__dirname, 'fixtures/app/components'),
  constants,
}))

const port = process.env.PORT || 3000
app.listen(port, err => {
  if (err) {
    console.log(err)
    return
  }
  console.log(`http://localhost:${port}`)
})
